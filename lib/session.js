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
                if(err.code == 11000)
                    return res.status(400).json({error: err})
                else
                    return res.status(500).json({ error: err });
            }
            res.status(201).json({ user: created });
        })
    },
    login: function(req, res) {
        console.log("Login body",req.body);
        console.log("Login cookies",req.session);
        console.log(req.session.user);
        console.log(req.session.pass);

        var user = req.body.username || "";
        var pass = req.body.password || "";
        var encryptedpass = crypto.createHmac('sha256', key).update(pass).digest('hex') || "";

        console.log(req.session.user == user);
        console.log(req.session.pass == pass);

        if(req.session.user == user){
            console.log("Yeah");
            return res.status(200).json({ _id: req.session.id, username: req.session.user });
        }
        // comprobar credenciales
        validate(user, encryptedpass)
            .then(function(userdata) {
                // establecer las cookies
                //res.cookie('user', user, { maxAge: 60000, httpOnly: true });
                req.session.id = userdata._id;
                req.session.user = user;
                //res.cookie('pass', pass,  { maxAge: 60000, httpOnly: true });
                req.session.pass = encryptedpass;
                // devolver 200 OK
                res.status(200).json({ _id: userdata._id, username: userdata.username });
            })
            .catch(function(err) {
                // devolver 401 Unauthorized
                res.status(401).json({ error: err});
            })
    },
    logout: function(req, res) {
        console.log("Prev logout:",req.cookies);
        if (req.session.user == undefined || req.session.pass == undefined){ // 
            return res.status(404).json({ error: "session does not exist"});
        }
        // res.clearCookie('user');
        // res.clearCookie('pass');
        // res.clearCookie('session.sig');
        req.session = null;
        console.log(req.session);
        res.status(200).json({ result: "logout ok"});
    }
}


module.exports = session;
