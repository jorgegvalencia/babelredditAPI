var express = require('express');
var router = express.Router({mergeParams: true});
var comments = require('./comments');
var auth = require('../../../lib/authenticator');

router.get('/', function(req, res) {
  res.send('My posts');
});

/**
* @api {POST} /topics/:topicid/posts Crear un nuevo post en el topic
* @apiParam String, title título del post
* @apiParam Object author
* @apiParam String author._id id del usuario que ha creado el post
* @apiParam String author.username nombre del usuario que ha creado el post
* @apiParam String description descripcion inicial (opcional) del post
* @apiParam String link String de una URL externa o uri del propio post
* @apiParam String thumbnail uri local del fichero de la imagen (**)
*/
router.post('/', auth(), function (req, res) {
	// body...
});

router.get('/:postid', function (req, res) {
	// body...
});

/**
* @api {PUT} /topics/:topicid/posts/:postid Editar un post
* @apiParam Object author
* @apiParam String author._id id del usuario que ha creado el post
* @apiParam String author.username nombre del usuario que ha creado el post
* @apiParam String description descripcion inicial (opcional) del post
* @apiParam String link String de una URL externa o uri del propio post
* @apiParam String thumbnail uri local del fichero de la imagen (**)
*/
router.put('/:postid', auth(), function (req, res) {
	// body...
	// si usuario logueado coincide con autor del post
		// modificar
	// sino, mandar forbidden
});

router.use('/:postid/comments', comments);

module.exports = router;
