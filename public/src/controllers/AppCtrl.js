angular.module("babelreddit").controller("AppCtrl", function($scope, $location, $anchorScroll, $routeParams, APIclient, Session, Topic, paths) {
    "ngInject";

    var controller = this;

    controller.titles = [];
    controller.titles[paths.all] = "Frontpage";

    //model init
    $scope.model = {
        webtitle: "BabelReddit",
        currentuser: null,
        currentTopic: Topic
    }

    // scope event listeners
    $scope.$on("$locationChangeSuccess", function(evt, currentRoute, prevRoute) {
        // console.log("Current route:", currentRoute);
        // console.log("Previous route:", prevRoute);
        $scope.model.webtitle = controller.titles[$location.path()] || "BabelReddit";
        //getTopicData();
        autologin();
        console.log("AppCtrl trying login")
        $anchorScroll();
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

    function getTopicData() {
        APIclient.getTopic("all")
            .then(function(response) {
                console.log("AppCtrl", "setting current topic.");
                Topic.setCurrentTopic(response.topic);
                console.log("AppCtrl", Topic.topic);
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    function autologin() {
        if (localStorage.getItem('user') !== null) {
            APIclient.login({ username: localStorage.getItem('user') })
                .then(function(response) {
                    Session.create(response._id, response.username);
                    $scope.$emit("$currentUser");
                })
                .catch(function(response) {
                    localStorage.removeItem('user');
                })
        }
    }

    // getTopicData();
    // autologin();

})
