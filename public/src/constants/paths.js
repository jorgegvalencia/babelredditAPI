angular.module("babelreddit").constant("paths", {
    root: "/",
    all: "/all",
    error: "/error",
    topics: "/topics",
    topic: "/topics/:topicid",
    posts: "/topics/:topicid/posts",
    post: "/topics/:topicid/posts/:postid",
    comments: "/topics/:topicid/posts/:postid/comments",
    register: "/register"
});