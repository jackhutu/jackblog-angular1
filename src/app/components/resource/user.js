(function () {
	'use strict';

	angular.module('jackblog.resources')
		.factory('User', function($resource,ServerUrl){
			var userResource = $resource(ServerUrl + '/api/users/:id/:controller', {
					id: '@_id'
				},
				{
					getCaptcha:{
						method: 'GET',
						params: {
						  id:'getCaptcha'
						}
					},
					get: {
						method: 'GET',
						params: {
							id:'me'
						}
					},
					mdUser:{
						method:'PUT',
						params:{
							id:'mdUser'
						}
					},
					getUserProvider:{
						method:'GET',
						params:{
							id:'getUserProvider'
						}
					}
				});

			return {
				get:userResource.get,
			  getCaptcha: function(callback){
			    var cb = callback || angular.noop;
			    return userResource.getCaptcha(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  mdUser:function (data,callback) {
			    var cb = callback || angular.noop;
			    return userResource.mdUser(data,function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  },
			  getUserProvider:function (callback) {
			    var cb = callback || angular.noop;
			    return userResource.getUserProvider(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  }
			};
		});
})();
