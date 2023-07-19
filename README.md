# gulp-mina-vue

A gulp plugin used to parse Vue [single-file component](https://vuejs.org/v2/guide/single-file-components.html) into wechat [MINA](https://developers.weixin.qq.com/miniprogram/dev/framework/MINA.html) files(wxml, wxss, js, json).

## Installation
```shell
$ npm i -D gulp-mina-vue
```

## Usage

Below is just a simple demo, please refer [weapp-boilerplate](https://github.com/tjeeay/weapp-boilerplate) to see more usage in real project.

```js
// gulpfile.js

const gulp = require('gulp')
const del = require('del')
const minaVue = require('gulp-mina-vue')

gulp.task('clean', _ => del('./dist/**/*.*'))

gulp.task('compile:MINA.wxml', _ => {
  return gulp.src('./src/**/*.vue')
  .pipe(minaVue.template())
  .pipe(gulp.dest('./dist'))
})

gulp.task('compile:MINA.wxss', _ => {
  return gulp.src('./src/**/*.vue')
  .pipe(minaVue.style())
  .pipe(gulp.dest('./dist'))
})

gulp.task('compile:MINA.js', _ => {
  return gulp.src('./src/**/*.vue')
  .pipe(minaVue.script())
  .pipe(gulp.dest('./dist'))
})

gulp.task('compile:MINA.json', _ => {
  return gulp.src('./src/**/*.vue')
  .pipe(minaVue.config())
  .pipe(gulp.dest('./dist'))
})

gulp.task('copy', _ => {
  return gulp.src([
    'src/**/*.*',
    '!src/**/*.vue'
  ])
  .pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'compile:MINA.wxml',
  'compile:MINA.wxss',
  'compile:MINA.js',
  'compile:MINA.json'
))

```

## License

MIT
