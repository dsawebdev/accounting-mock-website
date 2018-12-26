var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    htmlclean = require('gulp-htmlclean'),
    cleanCSS = require('gulp-clean-css'),
    webserver = require('gulp-webserver'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    del = require('del');


var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcIMG: ['src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'],
  srcFAVI: 'src/**/*.ico',
  srcFONTS: ['src/**/*.eot', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff', 'src/**/*.woff2']
}


//--Functions for Build to Dist-----
gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('assets:dist', function () {
  return gulp.src(paths.srcFAVI)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('fonts:dist', function () {
  return gulp.src(paths.srcFONTS)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('img:dist', function () {
  return gulp.src(paths.srcIMG)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js:dist', function () {
  return gulp.src(paths.srcJS)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['html:dist', 'css:dist', 'js:dist', 'img:dist', 'assets:dist', 'fonts:dist']);