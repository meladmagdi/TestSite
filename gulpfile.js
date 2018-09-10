var gulp        = require ('gulp'),
    uglify      = require('gulp-uglify'),
    header      = require('gulp-header'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    imagemin    = require('gulp-imagemin'),
    pkg         = require('./package.json'),
    cleanCSS    = require('gulp-clean-css'),
    autoprefix  = require('autoprefixer'),
    rucksack    = require('rucksack-css'),
    postcss     = require('gulp-postcss'),
    sass        = require('gulp-ruby-sass'),
    lost        = require('lost');

var files = {
  title: 'project',
  version: '1.0',
  desginer: {
    name: 'melade & mena',
    url: 'www.jesus.com'
  },
  inSass: 'vindor/style.scss',
  outCss: 'puplic/css/',
  css: 'puplic/css/',
  js: 'puplic/js/*.js'
};

// Copyright
var banner = ['/*!\n',
  ' * '+ files.title +' v'+ files.version +' Copyright &copy; '+ (new Date()).getFullYear() +'\n',
  ' * All Desgin &amp; code by '+ files.desginer.name +' | '+ files.desginer.url +'\n',
  ' */\n', ''].join('');

// uglify For javaScript mini
gulp.task('scripts', function(){
  gulp.src(files.js)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(gulp.dest('minjs'));
});
//sass for compile the code
gulp.task('sass', function(){
  var processors = [
    lost(),
    rucksack(),
    autoprefix()
  ];

  gulp.src(files.inSass)
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss(processors))// use processors
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest(files.outCss))// convert to css
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(files.outCss));// css to minify
});

// gulp watch is fot watching file

gulp.task('watch', function(){
  gulp.watch(files.js, ['scripts']);
});

gulp.task('default', ['scripts','sass','watch']);
