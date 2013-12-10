var pomelo = require('pomelo');
var dispatcher = require('./app/util/dispatcher');
var abuseFilter = require('./app/servers/chat/filter/abuseFilter');
var helloWorld = require('./app/components/HelloWorld');

// route definition for chat server
var chatRoute = function(session, msg, app, cb) {
  var chatServers = app.getServersByType('chat');

	if(!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), chatServers);

	cb(null, res.id);
};


/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			heartbeat : 3,
     
      // enable useDict will make route to be compressed 
      useDict: true,

      // enable useProto
      useProtobuf: true 
		}); 
 
  app.set('pushSchedulerConfig', {
    scheduler: [
      { id: 'direct',
        scheduler: pomelo.pushSchedulers.direct
      },
      { id: 'buffer5',
        scheduler: pomelo.pushSchedulers.buffer,
        options: {flushInterval: 5000}
      },

      { id: 'buffer10',
        scheduler: pomelo.pushSchedulers.buffer,
        options: {flushInterval: 20000}
      }
   ],
   selector: function(reqId, route, msg, recvs, opts, cb) {
       console.log('xxxxargs', 'reqId:', reqId, ',route:', route, ',msg: ', msg, ',recvs: ', recvs, ',opts:', opts);
     if(opts.type === 'push') {
       console.log('it should be push', opts);
       cb('buffer5');
       return;
     }
     if (opts.type === 'response') {
       console.log('it should be response', opts);
       cb('direct');
       return ;
     }
     if (opts.type === 'broadcast') {
       console.log('it should be broadcast', opts);
       cb('buffer10');
       return ;
     }
   }
 });
});

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useDict: true,

      // enable useProto
      useProtobuf: true
		});
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', chatRoute);
  app.filter(pomelo.timeout());
});

app.configure('production|development', 'chat', function() {
  app.filter(abuseFilter());
});

app.configure('production|development', 'master', function() {
  app.load(helloWorld, {interval: 5000});
});

// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});
