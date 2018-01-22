var File = require('vinyl'),
	assert = require('assert'),
	jsonFormat = require('./index.js'),
	through2 = require('through2'),
	Stream = require('stream');

var srcJson = '{"a":"b","c":[1,2,   3, 4]}';
var refJson = JSON.stringify(JSON.parse(srcJson), null, 4);

it('should format files with buffer content', function(done) {
	var file = new File({
		'contents': new Buffer(srcJson)
	});

	var testJsonFormat = jsonFormat(4);

	testJsonFormat.write(file);

	testJsonFormat.once('data', function(file) {
		assert(file.isBuffer());
		assert.equal(file.contents.toString('utf8'), refJson);

		done();
	});
});

it('should format files with stream content', function(done) {
	var readable = new Stream.Readable();
	readable._read = function() {
		this.push(new Buffer(srcJson));
		this.push(null);
	};

	var file = new File({
		'contents': readable
	});

	var testJsonFormat = jsonFormat(4);

	testJsonFormat.write(file);

	testJsonFormat.once('data', function(file) {
		assert(file.isStream());
		file.contents.pipe(through2(function(contents) {
			assert.equal(contents.toString('utf8'), refJson);
			done();
		}));
	});
});
