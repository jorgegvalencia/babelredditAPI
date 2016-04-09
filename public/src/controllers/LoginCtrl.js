angular.module("babelreddit").controller("LoginCtrl", function($scope, $location, $route, APIclient, Session, paths) {
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
                $route.reload();
            })
            .catch(function(response) {
                console.log(response);
            })
    }
})
