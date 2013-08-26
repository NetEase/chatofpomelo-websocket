var crc = require('crc');

// select an item from list based on key
module.exports.dispatch = function(key, list) {
	var index = Math.abs(crc.crc32(key)) % list.length;
	return list[index];
};
