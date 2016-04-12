'use strict'

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');

require('./model/topic');
require('./model/post');

var Topic = mongoose.model('topic');
var Post = mongoose.model('post');

function setDatabaseTopics() {
    mongoose.connection.collections['topics'].drop(function(err) {
        if (err) {
            console.log(err);
            console.log("Collection does not exist.");
        }
        console.log('collection dropped');
        fs.readFile('./topics.json', 'utf8', function(err, data) {
            if (err) {
                return;
            } else {
                var topics = JSON.parse(data);
                async.eachSeries(topics.rows,
                    function(item, next) {
                        var topic = new Topic(item);
                        topic.save(function(err) {
                            console.log("Topic saved");
                            next();
                        });
                    },
                    function end(err) {
                        //mongoose.connection.close();
                    }
                );
            }
        });
    });
}

function setDatabasePosts() {
    mongoose.connection.collections['posts'].drop(function(err) {
        if (err) {
            console.log(err);
            console.log("Collection does not exist.");
        }
        console.log('collection dropped');
        fs.readFile('./posts.json', 'utf8', function(err, data) {
            if (err) {
                return;
            } else {
                var posts = JSON.parse(data);
                async.eachSeries(posts.rows,
                    function(item, next) {
                        var params = {
                            topic: item.topic, // required
                            title: item.title, // required
                            author: {
                                _id: "57040f9dfff264bc07c294a3", // required
                                username: "user1" // required
                            },
                            creation_date: new Date().toISOString(),
                            description: item.description || null,
                            link: item.link || undefined,
                            thumbnail: item.thumbnail || undefined
                        };
                        var post = new Post(params);
                        post.save(function(err) {
                            console.log("Post saved");
                            next();
                        });
                    },
                    function end(err) {
                        mongoose.connection.close();
                    }
                );
            }
        });
    });
}

setDatabaseTopics();
setDatabasePosts();