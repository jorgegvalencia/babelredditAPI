angular.module("babelreddit").service("Topic", function(APIclient) {
    var topic = this;
    this.setCurrentTopic = function(topic) {
        this.topic = topic;
    }
    this.getCurrentTopic = function() {
        return this.topic;
    }

    this.getTopicData = function(topicid) {
        if (topicid) {
            APIclient.getTopic(topicid)
                .then(function(response) {
                    topic.setCurrentTopic(response.topic);
                })
                .catch(function(response) {
                    console.log(response);
                })
        }
    }
})
