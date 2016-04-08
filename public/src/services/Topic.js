angular.module("babelreddit").service("Topic", function() {
    var topic = this;
    this.setCurrentTopic = function(topic) {
        this.topic = topic;
    }
    this.getCurrentTopic = function() {
        return this.topic;
    }
})
