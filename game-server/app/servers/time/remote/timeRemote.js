module.exports = {};

module.exports.getCurrentTime = function (arg1, arg2, cb) {
  console.log("timeRemote - arg1: " + arg1+ "; " + "arg2: " + arg2);
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  cb( hour, min, sec);
};

