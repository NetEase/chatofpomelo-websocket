var pomelo = require('pomelo');
var bearcat = require('bearcat');
/**
 * Init app for client.
 */
var app = pomelo.createApp();

var Configure = function() {
	app.set('name', 'chatofpomelo-websocket');

	// app configuration
	app.configure('production|development', 'connector', function() {
		app.set('connectorConfig', {
			connector: pomelo.connectors.hybridconnector,
			heartbeat: 3,
			useDict: true,
			// useProtobuf: true
		});
	});

	app.configure('production|development', 'gate', function() {
		app.set('connectorConfig', {
			connector: pomelo.connectors.hybridconnector,
			// useProtobuf: true
		});
	});

	// app configure
	app.configure('production|development', function() {
		// route configures
		var routeUtil = bearcat.getBean('routeUtil');

		app.route('chat', routeUtil.chat.bind(routeUtil));

		// filter configures
		app.filter(pomelo.timeout());
	});
}

var contextPath = require.resolve('./context.json');
bearcat.createApp([contextPath]);

bearcat.start(function() {
	Configure();
	// start app
	app.start();
});

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});