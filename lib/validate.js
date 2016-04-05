'use strict'

var mongoose = require('mongoose');
require('../model/user');

var User = mongoose.model('user');

var validate = function(username, password) {
    return new Promise(function(resolve, reject) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                reject(err);
            } else {
                if (user.username === username && user.password === password) {
                    resolve(user);
                }
                else{
                	reject("invalid credentials");
                }
            }
        })
    });
}

module.exports = validate;
