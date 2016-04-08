angular.module("babelreddit").controller("TopicCtrl", function($scope, $location, APIclient, Topic) {

    $scope.model = {
        currentTopic: Topic
    }

    var locationTopic = $location.path().split("/")[2] || "all";

    function getTopicData() {
        APIclient.getTopic(locationTopic)
            .then(function(response) {
                Topic.setCurrentTopic(response.topic);
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    getTopicData();
})
