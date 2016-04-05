'use strict';

let auth = function() {
    return function(req, res, next) {
        // comprobar cookies
        if (req.cookies.username && req.cookies.password != null) {
        	// comprobar credenciales
            // si usuario ya logueado
            next();
        }
        // si credenciales erroneas o sin cookies, devolver 401 para que cliente redirija a login
        res.status(401).send();
    }
}

module.exports = auth;