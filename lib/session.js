var crypto = require('crypto');
var key = 'cl4V3l4rgac0nNum3rOsyLetR4S';
var validate = require('./validate');

// db and models
var mongoose = require('mongoose');
require('../model/user');

var User = mongoose.model('user');

var session = {
    register: function(req, res) {
        var name = req.body.username;
        var pass = crypto.createHmac('sha256', key).update(req.body.password).digest('hex');
        var email = req.body.email;
        var user = {
            username: name,
            password: pass,
            email: email
        };
        var newuser = new User(user);
        newuser.save(function(err, created) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ user: created });
        })
    },
    login: function(req, res) {
        var user = req.body.username;
        var pass = crypto.createHmac('sha256', key).update(req.body.password).digest('hex');
        // comprobar credenciales
        validate(user, pass)
            .then(function(userdata) {
                // establecer las cookies
                res.cookie('user', user);
                res.cookie('pass', pass);
                // devolver 200 OK
                res.status(200).json({ _id: userdata._id, username: userdata.username });
            })
            .catch(function(err) {
                // devolver 401 Unauthorized
                res.status(401).json({ error: err});
            })
    },
    logout: function(req, res) {
        if (req.cookies.user == undefined || req.cookies.pass == undefined){
            return res.status(404).json({ error: "session does not exist"});
        }
        console.log(req.cookies);
        res.clearCookie('user');
        res.clearCookie('pass');
        res.status(200).json({ result: "logout ok"});
    }
}


module.exports = session;
