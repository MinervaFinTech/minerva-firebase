var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new lessPluginAutoprefix({ browsers: ['last 2 versions'] });
var path = require('path');
var swPrecache = require('sw-precache');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var gls = require('gulp-live-server');
var url = require('url');
var path = require('path');
var fs = require('fs');

var paths = {
  base: './',
  src: './src/',
  build: './public/'
};

gulp.task('service-worker', function (callback) {
  swPrecache.write(path.join(paths.build, 'service-worker.js'), {
    staticFileGlobs: [
      paths.build + '*'
    ],
    importScripts: [
      'scripts/sw-toolbox.js'
    ],
    stripPrefix: paths.build
  }, callback);
});

gulp.task('processHTML', function () {
  gulp.src(path.join(paths.src, '*.html'))
    .pipe(gulp.dest(path.join(paths.build)));
});

gulp.task('processPWA', function () {
  gulp.src(path.join(paths.src, 'manifest.json'))
    .pipe(gulp.dest(path.join(paths.build)));
  gulp.src(path.join(paths.src, 'favicon.ico'))
    .pipe(gulp.dest(path.join(paths.build)));
});

gulp.task('processAssets', function () {
  gulp.src(path.join(paths.src, '/assets/**/*'))
    .pipe(gulp.dest(path.join(paths.build, 'assets')));
});

gulp.task('processJS', function () {
  gulp.src(path.join(paths.src, 'scripts/*.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['latest'] }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(paths.build, 'scripts')));
});

gulp.task('processReact', function () {
  gulp.src(path.join(paths.src, 'react/**/*'))
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(paths.build, 'react')));
});

gulp.task('processLESS', function () {
  gulp.src(path.join(paths.src, 'styles/*.less'))
    .pipe(sourcemaps.init())
    .pipe(less({ plugins: [lessAutoprefix], strictMath: "on" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(paths.build, 'styles')));
});

gulp.task('build', ['processLESS', 'processJS', 'processReact', 'processAssets', 'processHTML', 'processPWA', 'service-worker']);

gulp.task('default', ['serve']);


gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: paths.build,
      index: "index.html",
      middleware: browserSyncMiddlewareSPA
    },
    port: 3000
  });
  gulp.watch(path.join(paths.src, 'styles/**/*.less'), ['processLESS']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src, 'scripts/**/*.js'), ['processJS']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src, 'react/**/*'), ['processReact']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src, '*.html'), ['processHTML']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src, 'assets/**/*'), ['processAssets']).on('change', browserSync.reload);
});

gulp.task('node-serve', ['build'], function () {
  var server = gls.new('server.js');
  server.start();

  gulp.watch(path.join(paths.src, 'styles/**/*.less'), ['processLESS']).on('change', function (file) { server.notify.apply(server, [file]) });
  gulp.watch(path.join(paths.src, 'scripts/**/*.js'), ['processJS']).on('change', function (file) { server.notify.apply(server, [file]) });
  gulp.watch(path.join(paths.src, 'react/**/*.jsx'), ['processReact']).on('change', function (file) { server.notify.apply(server, [file]) });
  gulp.watch(path.join(paths.src, '*.html'), ['processHTML']).on('change', function (file) { server.notify.apply(server, [file]) });
  gulp.watch(path.join(paths.src, 'assets/**/*'), ['processAssets']).on('change', function (file) { server.notify.apply(server, [file]) });
  gulp.watch(path.join(paths.base, 'server.js')).on('change', function () { server.start.bind(server) });
});


/// Middle Ware for Browser Sync to serve Single Page Application 

function browserSyncMiddlewareSPA(req, res, next) {
  var fileName = url.parse(req.url);
  fileName = fileName.href.split(fileName.search).join("");
  var fileExists = fs.existsSync(paths.build + fileName);
  //console.log('Exists? ' + fileExists + ' --- ' + fileName);
  if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
    req.url = "/" + "index.html";
  }
  return next();
}