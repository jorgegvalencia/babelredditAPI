var express = require('express');
var router = express.Router({mergeParams: true});
var auth = require('../../../lib/authenticator');

router.get('/', function(req, res) {
  res.send('My comments');
});

router.post('/', auth(), function (req, res) {
	// body...
});

router.get('/:commentid', function (req, res) {
	// body...
});

router.put('/:commentid', auth(), function (req, res) {
	// body...
	// si usuario logueado coincide con autor del comentario
		// modificar
	// sino, mandar forbidden
});

module.exports = router;