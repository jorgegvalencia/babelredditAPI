var express = require('express');
var router = express.Router();
var posts = require('./posts');
var auth = require('../../../lib/authenticator');

/**
* @api {GET} /topics Obtener la lista de topics
*/
router.get('/', function (req, res) {
	// body...
});

/**
* @api {POST} /topics Crear un nuevo topic
*/
router.post('/', auth(), function (req, res) { // cambiar auth() por admin()
	// body...
});

/**
* @api {GET} /topics/:topicid Obtener los datos de un topic
*/
router.get('/:topicid', function (req, res) {
	// body...
});

/**
* @api {POST} /topics/:topicid Editar los datos de un topic
*/
router.put('/:topicid', auth(), function (req, res) { // cambiar auth() por admin()
	// body...
});

router.use('/:topicid/posts', posts);

module.exports = router;