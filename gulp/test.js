'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('./config');
var protractor = require("gulp-protractor").protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;
var Server = require('karma').Server;
var env = require('gulp-env');
var gulpSequence = require('gulp-sequence');
var browserSync = require('./server');

//e2e test
gulp.task('webdriver-update', webdriver_update);

gulp.task('test:protractor',function () {
	gulp.src(path.join(config.paths.e2e,'/spec.js'))
	  .pipe(protractor({
	  	configFile: path.join(config.paths.e2e,'/protractor.conf.js')
	  })).on('error', function (err) {
       process.exit(1);
    }).once('end', function () {
       process.exit();
    });
});
//e2e测试需要开启一个server
gulp.task('testserver', function() {
	browserSync.browserSyncInit(config.paths.dist,false,3333)
});

gulp.task('test:e2e',gulpSequence('clean',['build:e2e','webdriver-update'],'testserver','test:protractor'));
/**
 * Run test once and exit
 */
gulp.task('test:karma', function (done) {
  new Server({
  	configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd:karma', function (done) {
  new Server({
  	configFile: path.join(__dirname, '/../karma.conf.js'),
  	singleRun: false,
  	autoWatch: true
  }, done).start();
});

gulp.task('test',gulpSequence('test:karma'));