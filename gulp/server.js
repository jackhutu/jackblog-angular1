'use strict';

var gulp = require('gulp');
var config = require('./config');
var path = require('path');
var browserSync = require('browser-sync');
//var proxyMiddleware = require('http-proxy-middleware');
var browserSyncSpa = require('browser-sync-spa');
//var bs = browserSync.create();
var nodemon = require('gulp-nodemon');
var gulpSequence = require('gulp-sequence');

//开始之前先将必要文件注入
gulp.task('watch',['inject'],function () {
	//监控index.html,和bower.json文件
	gulp.watch([path.join(config.paths.src,'/*.html'),'bower.json'],['inject']);
	//监控CSS文件
	gulp.watch([path.join(config.paths.src,'/app/**/*.scss')],function (event) {
		if(event.type === 'changed'){
			gulp.start('styles:compass');
		}else{
			gulp.start('inject');
		}
	});
	//监控JS文件
	gulp.watch([path.join(config.paths.src,'/app/**/*.js')],function (event) {
		if(event.type === 'changed'){
			gulp.start('scripts');
		}else{
			gulp.start('inject');
		}
	});
	//监控html文件
	gulp.watch([
			path.join(config.paths.src,'/app/**/*.html')
		],function (event) {
			browserSync.reload(event.path);
		});

});


function browserSyncInit (baseDir,open,port) {
		// Only needed for angular apps,angular 正确路由需要
		browserSync.use(browserSyncSpa({
		  selector: '[ng-app]'
		}));
		//起动browserSync
	  browserSync.init({
	  	startPath:'/',
	  	port:port || 3000,
	  	open:open || false,
	  	server:{
		    baseDir: baseDir,
		    routes: {
		        "/bower_components": "bower_components"
		    },
		    //使用代理
		   //  middleware:[
			  //   proxyMiddleware(['/api/**','/auth/**'], {target: 'http://localhost:9000',changeOrigin:true})
			  // ]
			}
		});
}

exports.browserSyncInit = browserSyncInit;

gulp.task('serve', ['dev-config','watch'], function () {
	browserSyncInit([path.join(config.paths.tmp, '/serve'), config.paths.src],true);
});
gulp.task('serve:dist', ['build'], function () {
	browserSyncInit(config.paths.dist,true);
});

