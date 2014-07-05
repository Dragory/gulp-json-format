# gulp-json-format
> A [gulp](https://github.com/gulpjs/gulp) plugin to parse and format JSON in files.

`npm install gulp-json-format` --save

## Usage

```javascript
var jsonFormat = require('gulp-format-json');

gulp.src('manifest.json')
	.pipe(jsonFormat(4))
	.pipe(gulp.dest('.'));
```

## API

### jsonFormat([space])

#### space

Type: `Number` or `String`

See the space parameter for [JSON.stringify() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).