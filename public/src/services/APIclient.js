angular.module("babelreddit").service("APIclient", function($http, $q, Session, URL, apipaths) {
    "ngInject";

    var apiclient = this;

    apiclient.login = login;
    apiclient.isAuthenticated = isAuthenticated;
    apiclient.register = register;
    apiclient.logout = logout;
    apiclient.getTopicList = getTopicList;
    apiclient.getTopic = getTopic;
    apiclient.getPostList = getPostList;
    apiclient.getPost = getPost;
    apiclient.getCommentList = getCommentList;
    apiclient.createPost = createPost;
    apiclient.createComment = createComment;

    function login(credentials) {
        // Crear el objeto diferido
        var deferred = $q.defer();

        // Hacer trabajo asíncrono
        $http.post(apipaths.login, credentials)
            .then(function(response) {
                // Resolver la promesa
                console.log("APIclient.login response:", response);
                deferred.resolve(response.data); // Session.create(response._id, response.username);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    };

    function isAuthenticated() {
        return !!Session.userid;
    };

    function register(user) {
        // Crear el objeto diferido
        var deferred = $q.defer();

        // Hacer trabajo asíncrono
        $http.post(apipaths.register, user)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function logout() {
        // Crear el objeto diferido
        var deferred = $q.defer();

        // Hacer trabajo asíncrono
        $http.delete(apipaths.logout)
            .then(function(response) {
                // Resolver la promesa
                console.log("APIclient.logout response:", response);
                deferred.resolve(response.data); // Session.destroy
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function getTopicList() {
        // Crear el objeto diferido
        var deferred = $q.defer();
        // Hacer trabajo asíncrono
        $http.get(apipaths.topics)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function getTopic(topicid) {
        // Crear el objeto diferido
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.topic, { topicid: topicid });
        // Hacer trabajo asíncrono
        $http.get(requestURL)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function getPostList(topicid) {
        // Crear el objeto diferido
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.posts, { topicid: topicid });
        // Hacer trabajo asíncrono
        $http.get(requestURL)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function getPost(topicid, postid) {
        // Crear el objeto diferido
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.post, { topicid: topicid, postid: postid });
        // Hacer trabajo asíncrono
        $http.get(requestURL)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function getCommentList(topicid, postid) {
        // Crear el objeto diferido
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.comments, { topicid: topicid, postid: postid });
        // Hacer trabajo asíncrono
        $http.get(requestURL)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function createPost(topicid, post) {
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.posts, { topicid: topicid });
        // Hacer trabajo asíncrono
        $http.post(requestURL, post)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }

    function createComment(topicid, postid, comment) {
        var deferred = $q.defer();
        var requestURL = URL.resolve(apipaths.comments, { topicid: topicid, postid: postid });
        // Hacer trabajo asíncrono
        $http.post(requestURL, comment)
            .then(function(response) {
                // Resolver la promesa
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                // Rechazar la promesa
                deferred.reject(response.data);
            });
        // Devolver la promesa
        return deferred.promise;
    }
})
