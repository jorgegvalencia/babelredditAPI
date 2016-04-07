angular.module("babelreddit").controller("NavbarUserCtrl", function ($scope, $location, APIclient, Session, paths) {
	"ngInject";

	// document.cookie.user;
	// document.cookie.pass;

	$scope.logout = function () {
		APIclient.logout()
			.then(function (response) {
				Session.destroy();
				$scope.$emit("$currentUser");
				// $location.path(paths.root);
			})
			.catch(function (response) {
				console.log(response);
				Session.destroy();
				$scope.$emit("$currentUser");
			})
	}
})