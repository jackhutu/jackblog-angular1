(function () {
	'use strict';

	angular.module('jackblog.settings')
		.directive('snsloginbtns',function ($rootScope,User) {
			return {
				restrict:'E',
				templateUrl:'app/settings/sns_login_btn.html',
				replace:true,
				link:function ($scope,elem,attr) {
						User.getLogins().then(function (result) {
							$scope.loginBtns = result.data;
						});
				}
			};
		});
})();
