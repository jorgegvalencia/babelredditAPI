var express = require('express');
var router = express.Router();
var auth = require('../../../lib/authenticator');

// children routers
var topics = require('./topics');
var users = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * @api {POST} /login Loguea al usuario
 * @apiParam  String username Nombre de usuario
 * @apiParam  String password Contraseña del usuario
 */
router.post('/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    // comprobar credenciales
    // si OK
    	// establecer las cookies
    	res.cookie('user', user);
    	res.cookie('pass', pass);
    	// devolver 200 OK
		res.status(200).json({ user: user });
	// si no
		// devolver 401 Unauthorized
		res.status(401).send();
});

router.post('/logout', function(req, res) {
	console.log(req.cookies);
    res.clearCookie('user');
    res.clearCookie('pass');
    res.status(200).send();
})

router.use('/topics', topics);
router.use('/users', users);

module.exports = router;
