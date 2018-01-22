var through2 = require('through2');

function format(buf, spaces) {
	var parsed = JSON.parse(buf.toString('utf8'));
	return JSON.stringify(parsed, null, spaces);
}

module.exports = function(spaces) {
	return through2.obj(function(file, enc, cb) {
		if (file.isBuffer()) {
			file.contents = new Buffer(format(file.contents, spaces));
			cb(null, file);
		} else {
			file.contents.pipe(through2(function(contents) {
				file.contents = through2();
				cb(null, file);

				file.contents.write(format(contents, spaces));
				file.contents.end();
			}));
		}
	});
};
