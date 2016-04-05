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
* @apiParam String title título del topic
* @apiParam String description descripción del topic
* @apiParam String rules texto con las reglas del topic
* @apiParam String category id de la categoria del topic, seleccionada de un listado inicial
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
* @apiParam String title título del topic
* @apiParam String description descripción del topic
* @apiParam String rules texto con las reglas del topic
* @apiParam String category id de la categoria del topic, seleccionada de un listado inicial
*/
router.put('/:topicid', auth(), function (req, res) { // cambiar auth() por admin()
	// body...
});

router.use('/:topicid/posts', posts);

module.exports = router;