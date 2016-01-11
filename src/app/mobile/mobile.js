(function () {
	'use strict';

	angular.module('jackblog.mobile',[])
	.config(function ($stateProvider) {
		$stateProvider
		  .state('apps', {
		    url: '/apps',
		    templateUrl: 'app/mobile/mobile.html',
		    controller: 'MobileCtrl'
		  });
	});
})();
