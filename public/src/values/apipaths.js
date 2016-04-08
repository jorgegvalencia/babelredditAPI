angular.module("babelreddit").value("apipaths", {
	login: "/api/v1/login",
	register: "/api/v1/register",
	logout: "/api/v1/logout",
	users: "/api/v1/users",
	user: "/api/v1/users/:userid",
	topics: "/api/v1/topics",
	topic: "/api/v1/topics/:topicid",
	posts: "/api/v1/topics/:topicid/posts",
	post: "/api/v1/topics/:topicid/posts/:postid",
	comments: "/api/v1/topic/:topicid/posts/:postid/comments"
})