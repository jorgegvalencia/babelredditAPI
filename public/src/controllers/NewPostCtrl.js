angular.module("babelreddit").controller("NewPostCtrl", function($scope, $routeParams, $timeout, APIclient, Session, Topic) {
    "ngInject";

    $scope.model = {
        currentuser: Session,
        currentTopic: Topic,
    }

    $scope.successMessage = null;
    $scope.errorMessage = null;

    $scope.newpost = {
        title: null,
        topic: $routeParams.topicid,
        description: null,
        link: null,
        thumbnail: null
    }

    console.log("NewPostCtrl topicid:", $routeParams);

    $scope.isLogged = function() {
        return APIclient.isAuthenticated();
    }

    $scope.createPost = function() {
        // console.log(Topic.topic);
        var author = {
            _id: Session.userid,
            username: Session.username
        }
        $scope.errorMessage = null;
        $scope.newpost.author = author;
        var mypost = $scope.newpost;
        mypost.author = author;
        console.log("My post", mypost);
        APIclient.createPost($routeParams.topicid, mypost)
            .then(function(response) {
                $scope.successMessage = "Post creado! <a href=\"#/topics/" + $routeParams.topicid + '/posts/' + response.post._id + "\">Ir al post</a>";
                console.log($scope.postForm);
                $scope.postForm.$setPristine();
            })
            .catch(function(reponse) {
                console.log(response);
            })
    }

    $scope.submitPost = function () {
        if($scope.postForm.$valid){
            $scope.createPost();
        }
        else{
            $scope.clearError();
            $scope.setError();
        }
    }

    $scope.setError = function() {
        $scope.errorMessage = "Error al crear el post, por favor revisa el formulario. Recuerda que el título es obligatorio.";
        $timeout(function() {
            console.log("Borrando error");
            console.log($scope.errorMessage);
            $scope.errorMessage = null;
            console.log($scope.errorMessage);
        }, 2000);
    }

    $scope.clearError = function() {
        $scope.errorMessage = null;
        return false;
    }

    function clearFields() {
        $scope.newpost.title = "";
        $scope.newpost.description = "";
        $scope.newpost.link = "";
        $scope.newpost.thumbnail = "";
        $scope.postForm.$setPristine();
    }

    $scope.$on("$currentUser", function() { //evt, value
        $scope.model.currentuser = Session.username;
    });

    Topic.getTopicData($routeParams.topicid);
})
