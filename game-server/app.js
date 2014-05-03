var pomelo = require('pomelo');
var Bearcat = require('bearcat');
var routeUtil = require('./app/util/routeUtil');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		heartbeat: 3,
		useDict: true,
		useProtobuf: true
	});
});

app.configure('production|development', 'gate', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		useProtobuf: true
	});
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);

	// filter configures
	app.filter(pomelo.timeout());
});

var contextPath = require.resolve('./context.json');
var bearcat = Bearcat.createApp([contextPath]);

bearcat.start(function() {
	app.set('bearcat', bearcat);
	// start app
	app.start();
});

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});