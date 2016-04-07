angular.module("babelreddit", ["ngRoute", "ngSanitize"])
    .config(["$routeProvider", "paths", function($routeProvider, paths) {
        $routeProvider
            .when(paths.root, {
                redirectTo: paths.all
            })
            .when(paths.register, {
                templateUrl: "views/register.html"
            })
            .when(paths.topics, {
            	redirectTo: paths.all
            })
            .when(paths.all, {
                templateUrl: "views/all.html"
            })
            .when(paths.topic,  {
            	redirectTo: paths.posts
            })
            .when(paths.posts, {
            	templateUrl: "views/topic.html"
            })
            .when(paths.post, {
            	redirectTo: paths.comments
            })
            .when(paths.comments, {
            	templateUrl: "views/post.html"
            })
            .otherwise({
                redirectTo: paths.error,
                templateUrl: "views/error.html"
            })
    }]);
