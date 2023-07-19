const gulp = require('gulp')
const del = require('del')
const minaVue = require('../index.js');

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

gulp.task('watch', _ => {
  gulp.watch(['./src/**/*.vue'], { interval: 750 }, gulp.series(
    'compile:MINA.wxml',
    'compile:MINA.wxss',
    'compile:MINA.js',
    'compile:MINA.json'
  ))
})

gulp.task('dev', gulp.series(
  'build',
  'watch'
))
