angular.module("babelreddit").controller("AppCtrl", function($scope, $location, Session, paths) {
    "ngInject";

    var controller = this;

    controller.titles = [];
    controller.titles[paths.all] = "Frontpage";

    //model init
    $scope.model = {
        webtitle: "BabelReddit",
        currentuser: null
    }

    // scope event listeners
    $scope.$on("$locationChangeSuccess", function(evt, currentRoute, prevRoute) {
        // console.log("Current route:", currentRoute);
        // console.log("Previous route:", prevRoute);
        $scope.model.webtitle = controller.titles[$location.path()] || "404 Not Found";
    });

    $scope.$on("$changeTitle", function(evt, title) {
        $scope.model.title = title;
    });

    $scope.$on("$currentUser", function() { //newValue, oldValue
        $scope.model.currentuser = Session.username;
    });

    $scope.$watch($scope.model.currentuser, function() { //newValue, oldValue
        $scope.$broadcast("$currentUser");
    });

})
