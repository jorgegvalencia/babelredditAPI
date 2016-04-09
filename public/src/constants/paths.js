angular.module("babelreddit").constant("paths", {
	hash: '/#',
    root: "/",
    all: "/topics/all",
    error: "/error",
    topics: "/topics",
    topic: "/topics/:topicid",
    posts: "/topics/:topicid/posts",
    post: "/topics/:topicid/posts/:postid",
    newpost: "/topics/:topicid/newpost",
    comments: "/topics/:topicid/posts/:postid/comments",
    register: "/register"
});