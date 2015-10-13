var streamMap = require('map-stream'),
	through = require('through');

module.exports = function(spaces, eol) {
	return streamMap(function(file, cb) {
		var stream = this;

		var replacer = through(function(data) {
			var formatted = JSON.stringify(JSON.parse(data.toString()), null, spaces) + (eol || '');

			if (true || file.isBuffer()) {
				file.contents = new Buffer(formatted);
				cb(null, file);
			} else {
				file.contents = through();
				cb(null, file);

				file.contents.write(new Buffer(formatted));
				file.contents.end();
			}
		});

		file.pipe(replacer);
	});
};
