angular.module("babelreddit").controller("TopicCtrl", function($scope, $location, APIclient, Topic) {

    $scope.model = {
        currentTopic: ""
    }

    $scope.model.currentTopic = Topic;

    console.log("TopicCtrl:", "me cargo ahora");

    var locationTopic = $location.path().split("/")[2] || "all";

    function getTopicData() {
    	console.log(locationTopic);
        APIclient.getTopic(locationTopic)
            .then(function(response) {
                console.log("Ya he hecho la llamada", response);
                Topic.setCurrentTopic(response.topic);
                console.log("Objeto topic", Topic);
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    getTopicData();
})
