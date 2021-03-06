angular.module("babelreddit").controller("PostCtrl", function($scope, $routeParams, $route, APIclient, Topic, Session, paths) {
    "ngInject";

    // scope init
    $scope.model = {
        currentTopic: Topic,
        text: null
    };

    $scope.post = {};
    $scope.comments = [];
    $scope.errorMessage = null;
    $scope.deleteSuccess = null;


    var topicid = $routeParams.topicid;
    var postid = $routeParams.postid;

    function loadComments() {
        var commentlist = [];
        var resultlist = [];
        APIclient.getCommentList($routeParams.topicid, $routeParams.postid)
            .then(function(response) {
                commentlist = response.comments;
                // build comments tree
                var map = {},
                    node, roots = [];
                for (var i = 0; i < commentlist.length; i += 1) {
                    node = commentlist[i];
                    node.children = [];
                    map[node._id] = i; // use map to look-up the parents
                    if (node.reference !== null) {
                        commentlist[map[node.reference]].children.push(node);
                    } else {
                        roots.push(node);
                    }
                }
                $scope.comments = roots;
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    $scope.isLogged = function() {
        return APIclient.isAuthenticated();
    }

    // $scope.isAuthor = function() {
    //     if ($scope.post.author.username != undefined && Session != undefined) {
    //         return $scope.post.author.username == Session.username;
    //     } else
    //         return false;
    // }

    // $scope.deletePost = function () {
    //     APIclient.deletePost(topicid, postid)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (response) {
    //             console.log(response);
    //         });
    // }

    $scope.setErrorMsg = function() {
        $scope.errorMessage = "Escribe tu comentario!";
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
                $route.reload();
            })
            .catch(function(response) {
                console.log(response);
            })
    }

    $scope.$watch('model.text', function() {
        if ($scope.model.text == "") {
            $scope.model.text = null;
        }
    })

    APIclient.getPost($routeParams.topicid, $routeParams.postid)
        .then(function(response) {
            // console.log(response);
            $scope.post = response.post;
        })
        .catch(function(response) {
            console.log(response);
        })

    Topic.getTopicData($routeParams.topicid);
    loadComments();
})
