angular.module("babelreddit").controller("NavbarCtrl", function ($scope, APIclient) {
	"ngInject";

	//model init
	$scope.model = {
		username: null
	}



	$scope.isLogged = function () {
		// return APIclient.isAuthenticated();
		return true;
	}

	$scope.$on("$currentUser", function (evt, value) {
		$scope.model.username = value;
	})
})