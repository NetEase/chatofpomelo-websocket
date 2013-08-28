module.exports = function(app, opts) {
  return new HelloWorld(app, opts);
};


var DEFAULT_INTERVAL = 3000;

var HelloWorld = function(app, opts) {
  this.app = app;
  this.interval = opts.interval || DEFAULT_INTERVAL;
  this.timerId = null;
};

HelloWorld.name = '__HelloWorld__';

HelloWorld.prototype.start = function (cb) {
  console.log('Hello World Start');
  var self = this;
  this.timerId = setInterval(function() {
    console.log(self.getServerId() + "Hello World!");
   }, this.interval);
  process.nextTick(cb);
}

HelloWorld.prototype.afterStart = function (cb) {
  console.log('Hello World afterStart');
  process.nextTick(cb);
}

HelloWorld.prototype.stop = function (cb) {
  cosole.log('Hello World stop');
  clearInterval(this.timerId);
  process.nextTick(cb);
}


