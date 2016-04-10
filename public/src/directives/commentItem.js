angular.module("babelreddit").directive("commentItem", function () {
	return {
        restrict: 'AE',
    	replace: true,
        templateUrl: 'views/commentItem.html',
        scope: {
            model: "=item",
            isLogged: "&"
        },
        controller: 'CommentCtrl'
    }
})