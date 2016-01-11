(function () {
	
	'use strict';

	angular.module('jackblog')
	  .controller('NavbarCtrl', function ($rootScope,$scope,$state,$location,Auth,lodash) {
	    $scope.isLoggedIn = Auth.isLoggedIn;
	    $scope.isAdmin = Auth.isAdmin;
	    $scope.getCurrentUser = Auth.getCurrentUser;
	    $scope.logout = function () {
	      Auth.logout();
	      $state.go('home',{},{reload:true});
	    };
	    //切换模式
	    $scope.changeMode = function () {
	    	$rootScope.dayMode = !$rootScope.dayMode;
	    };
	    $scope.isActive = function(route) {
	    	if(route === '/'){
	    		return $location.path() !== '/apps';
	    	}else{
	    		return lodash.startsWith($location.path(),route);
	    	}
	    };

	  });
})();
