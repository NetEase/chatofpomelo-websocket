var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.send = function(msg, session, next) {
	console.log(msg);
	console.log(msg);
	console.log(msg);

	var rid = session.get('rid');
	var username = session.uid.split('*')[0];
	// console.log(this.app);

	var channelService = this.app.get('channelService');
	var param = {
		msg: msg.content,
		from: username,
		target: msg.target
	};
	console.log(param)
	channel = channelService.getChannel(rid, false);

	//the target is all users
	if (msg.target == '*') {
		channel.pushMessage('onChat', param);
	}
	//the target is specific user
	else {
		var tuid = msg.target + '*' + rid;
		var tsid = channel.getMember(tuid)['sid'];
		channelService.pushMessageByUids('onChat', param, [{
			uid: tuid,
			sid: tsid
		}]);
	}
	next(null, {
		route: msg.route
	});
};

module.exports = {
	id: "chatHandler",
	func: Handler
};