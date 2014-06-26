var RouteUtil = function() {
	this.$id = "routeUtil";
	this.$dispatcher = null;
}

RouteUtil.prototype.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if (!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = this.$dispatcher.dispatch(session.get('rid'), chatServers);

	cb(null, res.id);
};

module.exports = RouteUtil;