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
                            console.log("saved");
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
                        var post = new Post(item);
                        post.save(function(err) {
                            console.log("saved");
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

//setDatabaseTopics();
setDatabasePosts();
