  var Emitter = require('emitter');
  window.EventEmitter = Emitter;

  var protocol = require('pomelo-protocol');
  window.Protocol = protocol;
  
  var protobuf = require('pomelo-protobuf');
  window.protobuf = protobuf;

  var rsa = require('pomelo-rsasign');
  window.rsa = rsa;
  
  var pomelo = require('pomelo-jsclient-websocket');
  window.pomelo = pomelo;
