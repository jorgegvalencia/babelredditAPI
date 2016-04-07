angular.module("babelreddit").controller("LoginCtrl", function($scope, $location, APIclient, Session, paths) {
    "ngInject";

    $scope.model = {
        username: null,
        password: null
    }

    $scope.login = function() {
        APIclient.login($scope.model)
            .then(function(response) {
                Session.create(response._id, response.username);
                $scope.$emit("$currentUser");
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    function autologin(user) {
        APIclient.login({username: user})
            .then(function(response) {
                Session.create(response._id, response.username);
                $scope.$emit("$currentUser");
            })
            .catch(function(response) {
 				localStorage.removeItem('user');
            })
    }

    if (localStorage.getItem('user') !== null) {
        autologin(localStorage.getItem('user'));
    }
})
