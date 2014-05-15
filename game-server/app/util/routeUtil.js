var RouteUtil = function() {
	this.dispatcher = null;
}

RouteUtil.prototype.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if (!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = this.dispatcher.dispatch(session.get('rid'), chatServers);

	cb(null, res.id);
};

module.exports = {
	id: "routeUtil",
	func: RouteUtil,
	props: [{
		name: "dispatcher",
		ref: "dispatcher"
	}]
}