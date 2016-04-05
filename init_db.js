'use strict'

var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');

require('./model/topic');

var Topic = mongoose.model('topic');

function setDatabaseTopics() {
  mongoose.connection.collections['topics'].drop(function (err) {
    if (err) {
      console.log("Collection does not exist.");
    }
    console.log('collection dropped');
    fs.readFile('./topics.json', 'utf8', function (err, data) {
      if (err) {
        return;
      }
      else {
        var topics = JSON.parse(data);
        async.eachSeries(topics.rows,
          function (item, next) {
            var topic = new Topic(item);
            console.log(topic);
            topic.save(function (err) {
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
