angular.module("babelreddit").controller("PostCtrl", function($scope, $routeParams, APIclient, Topic, Session, paths) {
    "ngInject";

    // scope init
    $scope.model = {
        currentTopic: Topic,
        text: null
    };

    $scope.post = {};
    $scope.comments = [];


    var topicid = $routeParams.topicid;
    var postid = $routeParams.postid;

    console.log("PostCtrl params:", $routeParams);

    function loadComments() {
    	var commentlist = [];
    	APIclient.getCommentList($routeParams.topicid, $routeParams.postid)
        .then(function(response) {
            console.log("response",response);
            commentlist = response.comments;
            // build comments tree
            

            //$scope.comments = commentlist;
            console.log("comments", $scope.comments);
        })
        .catch(function(response) {
            console.log(response);
        })
    }

    $scope.isLogged = function() {
        return APIclient.isAuthenticated();
    }

    $scope.sendComment = function() {
        var mycomment = {
            author: {
                _id: Session.userid,
                username: Session.username
            },
            reference: null,
            text: $scope.model.text
        }
        APIclient.createComment(topicid, postid, mycomment)
            .then(function(response) {
                console.log(response);
                console.log("Comentario enviado!");
                $scope.model.text = null;
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    APIclient.getPost($routeParams.topicid, $routeParams.postid)
        .then(function(response) {
            console.log(response);
            $scope.post = response.post;
        })
        .catch(function(response) {
            console.log(response);
        })

    Topic.getTopicData($routeParams.topicid);
    loadComments();
})
