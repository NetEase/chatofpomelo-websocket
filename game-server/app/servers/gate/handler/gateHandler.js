var bearcat = require('bearcat');
var pomelo = require('pomelo');

var GateHandler = function() {
	this.$id = "gateHandler";
	this.app = pomelo.app;
	this.$dispatcher = null;
};

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
GateHandler.prototype.queryEntry = function(msg, session, next) {
	var uid = msg.uid;
	if (!uid) {
		next(null, {
			code: 500
		});
		return;
	}
	// get all connectors
	var connectors = this.app.getServersByType('connector');
	if (!connectors || connectors.length === 0) {
		next(null, {
			code: 500
		});
		return;
	}
	// select connector
	var res = this.$dispatcher.dispatch(uid, connectors);
	next(null, {
		code: 200,
		host: res.host,
		port: res.clientPort
	});
};

module.exports = function() {
	return bearcat.getBean(GateHandler);
};