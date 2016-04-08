angular.module("babelreddit").controller("PostCtrl", function ($scope, $routeParams, APIclient, Topic, paths) {
	"ngInject";

	// scope init
	$scope.model = {
		currentTopic: Topic
	};

	var topicid = $routeParams.topicid;
	var postid =  $routeParams.postid;
	console.log(topicid);
	console.log(postid);

	APIclient.getCommentList($routeParams.topicid, $routeParams.postid)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (response) {
			console.log(response);
		})

	// mover a un sitio compartido
	function getTopicData() {
        APIclient.getTopic(topicid)
            .then(function(response) {
                Topic.setCurrentTopic(response.topic);
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    getTopicData();
})