var express = require('express');
var router = express.Router();

// children routers
var topics = require('./topics');
var users = require('./users');

// utils
var session = require('../../../lib/session');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
@api {POST} /register Registro de un usuario
@apiParam  String username Nombre de usuario
@apiParam  String password Contraseña de usuario
@apiParam  String email Email del usuario
*/
router.post('/register', function (req, res) {
    session.register(req, res);
});

/**
 * @api {POST} /login Loguea al usuario
 * @apiParam  String username Nombre de usuario
 * @apiParam  String password Contraseña del usuario
 */
router.post('/login', function(req, res) {
    session.login(req, res);
});

router.delete('/logout', function(req, res) {
    session.logout(req, res);
});

router.use('/topics', topics);
router.use('/users', users);

module.exports = router;
