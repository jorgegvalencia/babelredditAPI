angular.module("babelreddit").controller("HeaderCtrl", function ($scope, Topic, APIclient) {
	"ngInject";

	$scope.model = {
		currentTopic: Topic
	}

})