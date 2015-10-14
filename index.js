var path = require('path');
var gutil = require('gulp-util');
var through = require('through');
var streamMap = require('map-stream');

module.exports = function(spaces, endWithNewLine) {
  return streamMap(function(file, cb) {
    var stream = this;
    var replacer = through(function(data) {
      var name = file.history || [''];
      name = gutil.colors.green(path.basename(name[0]));
      try {
        var formatted = JSON.stringify(JSON.parse(data.toString()), null, spaces) + (endWithNewLine ? '\n' : '');
        if (true || file.isBuffer()) {
          file.contents = new Buffer(formatted);
        } else {
          file.contents = through();
          file.contents.write(new Buffer(formatted));
          file.contents.end();
        }
        gutil.log(name, gutil.colors.blue('ok'));
      } catch (error) {
        gutil.log(name, gutil.colors.red('error'));
      }
      cb(null, file);
    });
    file.pipe(replacer);
  });
}
