angular.module("babelreddit").controller("SidebarCtrl", function ($scope, $location, URL, APIclient, Topic, paths) {
	"ngInject";

	// scope init

	$scope.model = {
		currentTopic: Topic,
		topics: [],
	}

	$scope.model.getClass = function(topic){
		var active = $scope.model.currentTopic.getCurrentTopic().abrev;
		console.log("Active now: ", active);
		if( topic == active){
			return "active";
		}
		else {
			return "";
		}
	}

	$scope.getTopicUrl = function (topicid) {
		return URL.resolve(paths.topic, { topicid: topicid });		
	}

	APIclient.getTopicList()
		.then(function (response) {
			console.log(response.topics);
			$scope.model.topics = response.topics;
		})
		.catch(function (response) {
			console.log(response);
		});
})