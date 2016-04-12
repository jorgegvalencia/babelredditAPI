angular.module("babelreddit").controller("CommentCtrl", function($scope, $routeParams, $route, Session, APIclient) {
    "ngInject";

    $scope.reply = false;
    $scope.text = null;

    var topicid = $routeParams.topicid;
    var postid = $routeParams.postid;

    $scope.toggleReply = function() {
    	console.log("funciono");
        $scope.reply = $scope.reply ? false : true;
    }

    $scope.sendComment = function(reference) {
        var mycomment = {
            author: {
                _id: Session.userid,
                username: Session.username
            },
            reference: reference,
            text: $scope.text
        }
        APIclient.createComment(topicid, postid, mycomment)
            .then(function(response) {
                console.log(response);
                console.log("Comentario enviado!");
                $scope.text = null;
                $route.reload();
            })
            .catch(function(response) {
                console.log(response);
            })
    }

})
