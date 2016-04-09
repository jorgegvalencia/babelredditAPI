angular.module("babelreddit").filter("ago", [function () {
	return function (text) {
		return moment(text).fromNow();
	}
}]
);