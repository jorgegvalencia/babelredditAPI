angular.module("babelreddit").service('Session', function() {
    this.create = function(userid, username) {
        this.userid = userid;
        this.username = username;
        localStorage.setItem('user', username);
    };
    this.destroy = function() {
        this.userid = null;
        this.username = null;
        localStorage.removeItem('user');
    };
})
