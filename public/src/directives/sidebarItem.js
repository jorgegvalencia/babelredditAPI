angular.module("babelreddit").directive("sidebarItem", function() {
    return {
        restrict: 'AE',
    	replace: true,
        templateUrl: 'views/sidebarItem.html',
        scope: {
            model: "=item",
            getTopicUrl: "&"
        }
    }
})
