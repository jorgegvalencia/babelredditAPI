angular.module("babelreddit").controller("SidebarCtrl", function ($scope, $location, URL, APIclient, Topic, paths) {
	"ngInject";

	// scope init

	$scope.model = {
		currentTopic: Topic,
		active: $location.path().split("/")[2] || "all",
		topics: [],
	}

	$scope.model.getClass = function(topic){
		// var active = $scope.model.currentTopic.getCurrentTopic().abrev || "";
		if( topic == $scope.model.active){
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
			$scope.model.topics = response.topics;
		})
		.catch(function (response) {
			console.log(response);
		});
})