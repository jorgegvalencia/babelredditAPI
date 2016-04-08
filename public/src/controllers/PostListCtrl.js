angular.module("babelreddit").controller("PostListCtrl", function($scope, $location, APIclient, paths, URL, Topic) {
    "ngInject";

    // scope init

    $scope.model = {
        currentTopic: Topic,
        active: $location.path().split("/")[2] || "all",
        posts: []
    }

    APIclient.getPostList($scope.model.active)
        .then(function(response) {
            $scope.model.posts = response.posts;
        })
        .catch(function(response) {
            console.log(response);
        })

    $scope.getPostUrl = function(post) {
        var posturl = URL.resolve(paths.comments, { topicid: post.topic, postid: post._id });
        return posturl;
    }


    $scope.getPostTitleUrl = function(post) {
        var url = post.link || "";
        if (url !== "") {
            return url;
        } else {
            return URL.resolve(paths.comments, { topicid: post.topic, postid: post._id });
        }
    }
})
