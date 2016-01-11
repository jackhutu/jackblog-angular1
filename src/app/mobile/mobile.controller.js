(function () {
  'use strict';

  angular.module('jackblog.mobile')
    .controller('MobileCtrl', function ($scope,Mobile) {
    	Mobile.getApps().then(function (result) {
    		$scope.apps = result.data;
    	});
    });
})();
