/**
 * @author Jeremy Munsch <jeremy@focalys.com>
 * @class
 * Sert à
 * - Etablir une connection à une adresse
 * - Fermer une connection
 * - Envoyer un Objet Requete
 * - Retourner un Objet Reponse
 * - Gérer le time out (connection fermé inopinément)
 * - Gère les modes de transport ssh,telnet
 * @method close Ferme la connection
 * @method send Envoie un requete
 * @method setTransport
 *
 * NE Gere pas encore ls SSH
 */

var telnet = require('telnet-client');
var tools = require('./../tools');

// function Transport() {

// };

/**
 * Ouvre une connection vers une adresse
 * @augments {IP} adresse ip de destination
 * @return {Reponse} La connection à réussie ou non
 */
// Transport.prototype.open = function(adresseIp) {

// };

/**
 * Ferme la connection active
 * @return {Boolean} La connection à été fermé correctement
 */
// Transport.prototype.close = function() {

// };

/**
 * Envoie une requete
 * @augments {Requete} Objet Requetes
 * @return {Reponse} Objet Reponse
 */
// Transport.prototype.send = function() {

// };

var Transport = (function () {

		// private static
		var transportsDisp = ['telnet','ssh']; // Modes de transports disponibles
		var delais = 15000; // en secondes
		var hoteDefaut = '10.126.129.195';
		var portDefaut = 23;

		var parametresTelnet = {
			host: hoteDefaut,
			port: portDefaut,
			//shellPrompt: '/ # ',
			timeout: delais,
			// removeEcho: 4
		};

		// constructor
		var cls = function () {

				// private
				var transportActif = transportsDisp[0];
				var etatConnection = false; // Connection ouverte ou fermée
				var connexion = null;
				var parametres = null;

				// public (this instance only)
				this.isOpen = false;
				this.destination = null;

				// public methods
				/**
				 * Ouvre une connexion vers une adresse
				 * @augments {IP,FQDN} adresse de destination {port} {closure}
				 * @return {Reponse} La connexion à réussie ou non
				 */
				this.connexion = function(addresse, port, closure) {

					connexion = new telnet();

					addresse = (typeof addresse !== 'undefined')?addresse:hoteDefaut;
					port = (typeof port !== 'undefined' && arguments.length == 2)?port:portDefaut;

					parametresTelnet.host = addresse;
					parametresTelnet.port = port;

					tools.debug('Ouverture de connexion en '+transportActif);

					function connexionPret(prompt) {
						tools.debug(prompt);
						etatConnection = true;
						tools.debug('Etat de la connexion'+etatConnection);
						if(typeof closure === 'function') closure.apply(this,arguments);
					};

					switch(transportActif) {
						case 'telnet':
							connexion.connect(parametresTelnet); // Connexion
							connexion.on('ready',connexionPret); // Closure de connexion
							break;
						case 'ssh':
							break;
						default:
							return new Error('Moyen de transport '+transportActif+' est inconnu');
					}
				};

				this.delais = function(iDelais) {
					if(typeof iDelais == 'number') {
						delais = iDelais;
					} else {
						throw new Error('Delais doit être un nombre');
					}
				};

				this.delaisClosure = function(closure) {
						connexion.on('timeout', function() {
							tools.debug('Connexion délais dépassé');
							connexion.end();
							closure();
						});
				};

				this.deconnexionClosure = function(closure) {
					connexion.on('close', function() {
						tools.debug('Fermeture de la connexion');
						closure();
						connexion.destroy();
						connexion = null;
					});
				};

				this.deconnexion = function() {
					connexion.end();
				};
		};

		// public static
		cls.transports = function() {
			return transportsDisp;
		}

		// public (shared across instances)
		cls.prototype = {
				transport: function(transport) {
					if(transportsDisp.indexOf(transport) !== -1) {
						this.transportActif = transport;
					} else {
						throw new Error('Le moyen de transport '+transport+' n\'est pas disponible.');
					}
					return this.transports;
				}
		};

		return cls;
})();

module.exports.Transport = Transport;