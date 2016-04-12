angular.module("babelreddit").directive("commentToggle", function() {
    return function(scope, element, attrs) {
    	var target = attrs.target;
        element.bind("click", function() {
            // var target = $(this).attr('href');
            $(target).toggleClass('hidden show');
        });
    }
})
