angular.module("babelreddit").value("apipaths", {
	login: "/login",
	register: "/register",
	logout: "/logout",
	users: "/users",
	user: "/users/:userid",
	topics: "/topics",
	topic: "/topic/:topicid",
	posts: "/topic/:topidid/posts",
	post: "/topic/:topicid/posts/:postid",
	comments: "/topic/:topicid/posts/:postid/comments"
})