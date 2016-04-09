angular.module("babelreddit").controller("NavbarCtrl", function ($scope, APIclient, Session) {
	"ngInject";

	// formulario de login, mensaje de registro
	// dropdown de usuario

	//model init
	$scope.model = {
		currentuser: Session.username
	}

	$scope.isLogged = function () {
		return APIclient.isAuthenticated();
	}

	$scope.$on("$currentUser", function () { //evt, value
		$scope.model.currentuser = Session.username;
	});
})