var argv = require('minimist')(process.argv.slice(2));

SPDEBUG = false;

/**
 * Objet Transport
 * Sert à
 * - Etablir une connection à une adresse
 * - Fermer une connection
 * - Envoyer un Objet Requete
 * - Retourner un Objet Reponse
 * - Gérer le time out (connection fermé inopinément)
 * - Gère les modes de transport ssh,telnet
 *
 * Objet Requete
 * Sert à
 * - Contenir la commande principale
 * - Contient les arguments
 *
 * Objet Reponse
 * Sert à
 * - Contenir la réponse brute en ASCII
 * - Contenir un boolean si la commande échoue
 * - Contenir un boolean si la commande est incomplète
 * - Contenir un message d'erreur
 * - Contenir une série d'objet
 * -- Interface, IP, Message
 */