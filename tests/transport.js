routerTest = '192.168.1.10';
routerTestPort = 23;
SPDEBUG = true;
var Transport = require('../lib/objects/transport.js').Transport;

exports.TransportInstance = function(test){
	var transport = new Transport();
	test.strictEqual(typeof transport,'object');
	test.equal(transport.isOpen,false);
	test.strictEqual(transport.destination,null);
	test.done();
};

exports.TransportConnexion = function(test) {
	var transport = new Transport();
	var connectionFail = false;

	// Get transports
	var transports = Transport.transports();
	test.ok(transports instanceof Array,'typeof transports is instanceof Array');

	transport.transport('telnet');
	transport.transport('ssh');

	transport.delais(2300);

	test.throws(function() {
		transport.delais('gloubilboulga');
	},Error,'Cannot setup timout without a Number');

	test.throws(function() {
		transport.transport('gloubilboulga');
	},Error,'Cannot setup unknown transport');

	transport.connexion(routerTest,routerTestPort,function() {
		test.done();
	});

	transport.delaisClosure(function() {
		connectionFail = true;
	});

	transport.deconnexionClosure(function() {
		test.ok(connectionFail);
		test.done();
	});
};