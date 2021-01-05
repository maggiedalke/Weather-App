const { src, dest, series } = require('gulp');
const cleanCSS = require('gulp-cleancss');
const concatCss = require('gulp-concat-css');
const jsMinify = require('gulp-minify');
const jsConcat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function htmlTask() {
  return src('src/*.html').pipe(dest('dist'));
}

function stylesTask() {
  return src('src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concatCss('bundle.css'))
    .pipe(dest('dist/css'));
}

function scriptTask() {
  return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(jsConcat('all.js'))
    .pipe(jsMinify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'));
}

exports.html = htmlTask;
exports.styles = stylesTask;
exports.script = scriptTask;

exports.default = series(htmlTask, stylesTask, scriptTask);
