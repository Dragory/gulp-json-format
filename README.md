# gulp-json-format [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> A [gulp](https://github.com/gulpjs/gulp) plugin to parse and format JSON in files.

## Usage

First, install `gulp-json-format` as a development dependency:

```
npm install gulp-json-format --save-dev
```

Then, add it to your `gulpfile.js`:

```javascript
var jsonFormat = require('gulp-json-format');

gulp.src('manifest.json')
	.pipe(jsonFormat(4))
	.pipe(gulp.dest('.'));
```

## API

### jsonFormat([space])

#### space

Type: `Number` or `String`

See the space parameter for [JSON.stringify() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

[npm-url]: https://www.npmjs.org/package/gulp-json-format
[npm-image]: https://badge.fury.io/js/gulp-json-format.svg

[travis-url]: https://travis-ci.org/Dragory/gulp-json-format
[travis-image]: https://api.travis-ci.org/Dragory/gulp-json-format.svg
