var path = require('path');
var gutil = require('gulp-util');
var through = require('through');
var streamMap = require('map-stream');

module.exports = function(spaces, endWithNewLine) {
  return streamMap(function(file, cb) {
    var stream = this;
    var replacer = through(function(data) {
      try {
        var formatted = JSON.stringify(JSON.parse(data.toString()), null, spaces) + (endWithNewLine ? '\n' : '');
        if (true || file.isBuffer()) {
          file.contents = new Buffer(formatted);
        } else {
          file.contents = through();
          file.contents.write(new Buffer(formatted));
          file.contents.end();
        }
        gutil.log(gutil.colors.green((path.basename(file.history[0]))), gutil.colors.blue('ok'));
      } catch (error) {
        gutil.log(gutil.colors.green((path.basename(file.history[0]))), gutil.colors.red('error'));
      }
      cb(null, file);
    });
    file.pipe(replacer);
  });
}
