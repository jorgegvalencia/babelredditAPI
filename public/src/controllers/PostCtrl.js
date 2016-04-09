angular.module("babelreddit").controller("PostCtrl", function ($scope, $routeParams, APIclient, Topic, paths) {
	"ngInject";

	// scope init
	$scope.model = {
		currentTopic: Topic
	};

	$scope.post = {};

	var topicid = $routeParams.topicid;
	var postid =  $routeParams.postid;

	console.log("PostCtrl params:", $routeParams);

	$scope.isLogged = function () {
		return APIclient.isAuthenticated();
	}

	APIclient.getPost($routeParams.topicid, $routeParams.postid)
		.then(function (response) {
			console.log(response);
			$scope.post = response.post;
		})
		.catch(function (response) {
			console.log(response);
		})

	APIclient.getCommentList($routeParams.topicid, $routeParams.postid)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (response) {
			console.log(response);
		})

	Topic.getTopicData($routeParams.topicid);
})