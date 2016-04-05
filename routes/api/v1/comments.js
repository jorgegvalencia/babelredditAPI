var express = require('express');
var router = express.Router({mergeParams: true});
var auth = require('../../../lib/authenticator');

router.get('/', function(req, res) {
  res.send('My comments');
});

/**
* @api {POST} /topics/:topicid/posts/:postid/comments Crear un comentario
* @apiParam author Object
* @apiParam String author._id id del usuario que ha creado el comentario
* @apiParam String author.username nombre del usuario que ha creado el comentario 
* @apiParam String text texto del comentario
* @apiParam String reference id del comentario respuesta (si es null es referente al post)
*/
router.post('/', auth(), function (req, res) {
	// body...
});

router.get('/:commentid', function (req, res) {
	// body...
});

/**
* @api {PUT} /topics/:topicid/posts/:postid/comments/:commentid Editar un comentario
* @apiParam author Object
* @apiParam String author._id id del usuario que ha creado el comentario
* @apiParam String author.username nombre del usuario que ha creado el comentario 
* @apiParam String text texto del comentario
* @apiParam String reference id del comentario respuesta (si es null es referente al post)
*/
router.put('/:commentid', auth(), function (req, res) {
	// body...
	// si usuario logueado coincide con autor del comentario
		// modificar
	// sino, mandar forbidden
});

module.exports = router;