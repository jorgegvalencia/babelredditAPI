angular.module("babelreddit", ["ngRoute", "ngSanitize"])
    .config(["$routeProvider", "paths", function($routeProvider, paths) {
        $routeProvider
            .when(paths.root, {
                redirectTo: paths.all
            })
            .otherwise({
                redirectTo: paths.error
            })
    }]);
