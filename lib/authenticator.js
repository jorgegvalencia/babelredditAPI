'use strict';

var validate = require('./validate');

let auth = function() {
    return function(req, res, next) {
        // comprobar cookies
        if (req.cookies.user && req.cookies.pass != null) {
            // comprobar credenciales
            validate(req.cookies.user, req.cookies.pass)
                .then(function(user) {
                    next();
                })
                .catch(function(err) {
                    if(err == "invalid credentials"){
                        return res.status(404).json({ error: err});
                    }
                    return res.status(500).json({ error: err});
                })
        } else {
        // sin cookies, devolver 401 para que cliente redirija a login
        return res.status(401).json({ error: "unauthorized"});
        }
    }
}

module.exports = auth;
