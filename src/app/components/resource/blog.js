(function () {
  'use strict';

  angular.module('jackblog.resources')
    .factory('Blog', function($resource,ServerUrl){
      var blogResource = $resource(ServerUrl + '/api/blog/:id/:controller', {
          id: '@_id'
        },
        {
          //前台数据
          getFrontBlogList:{
            method:'GET',
            params:{
              id:'getFrontBlogList'
            }
          },
          getFrontBlogCount:{
            method:'GET',
            params:{
              id:'getFrontBlogCount'
            }
          },
          getFrontArticle:{
            method:'GET',
            params:{
              controller:'getFrontArticle'
            }
          },
          getIndexImage:{
            method:'GET',
            params:{
              id:'getIndexImage'
            }
          },
          toggleLike:{
            method:'PUT',
            params:{
              controller:'toggleLike'
            }
          },
          getPrenext:{
            method:'GET',
            params:{
              controller:'getPrenext'
            }
          }
        });
      return {
        //前台数据
        getFrontBlogList:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontBlogList(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontBlogCount:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontBlogCount(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getFrontArticle:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getFrontArticle(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getIndexImage:function (callback) {
          var cb = callback || angular.noop;
          return blogResource.getIndexImage(function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        toggleLike:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.toggleLike(data,{},function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        },
        getPrenext:function (data,callback) {
          var cb = callback || angular.noop;
          return blogResource.getPrenext(data,function(result) {
            return cb(result);
          }, function(err) {
            return cb(err);
          }).$promise;
        }
      };


    });
})();

