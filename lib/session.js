var crypto = require('crypto');
var key = 'cl4V3l4rgac0nNum3rOsyLetR4S';

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
            return res.status(201).json({ user: created });
        })
    },
    login: function(req, res) {
        var user = req.body.username;
        var pass = crypto.createHmac('sha256', key).update(req.body.password).digest('hex');
        // comprobar credenciales
        // si OK
        // establecer las cookies
        res.cookie('user', user, {maxAge: 60 * 1000});
        res.cookie('pass', pass, {maxAge: 60 * 1000});
        // devolver 200 OK
        res.status(200).json({ user: user });
        // si no
        // devolver 401 Unauthorized
        res.status(401).send();
    },
    logout: function(req, res) {
        console.log(req.cookies);
        res.clearCookie('user');
        res.clearCookie('pass');
        res.status(200).send();
    }
}


module.exports = session;
