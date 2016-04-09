angular.module("babelreddit").controller("TopicCtrl", function($scope, $location, $routeParams, APIclient, Topic) {
    "ngInject";

    $scope.model = {
        currentTopic: Topic
    }

    // var locationTopic = $location.path().split("/")[2] || "all";

    console.log("TopicCtrl topicid:", $routeParams);

    Topic.getTopicData($routeParams.topicid || "all");
})
