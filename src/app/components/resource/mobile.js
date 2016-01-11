(function () {
	'use strict';

	angular.module('jackblog.resources')
		.factory('Mobile', function($resource,ServerUrl){
			var mobileResource = $resource(ServerUrl + '/mobile/:id/:controller', {
					id: '@_id'
				},
				{
					getApps:{
						method:'GET',
						params:{
							id:'getApps'
						}
					}
				});

			return {
			  getApps:function (callback) {
			    var cb = callback || angular.noop;
			    return mobileResource.getApps(function(result) {
			      return cb(result);
			    }, function(err) {
			      return cb(err);
			    }).$promise;
			  }
			};
		});
})();
