var express = require('express');
var router = express.Router();
var posts = require('./posts.js');

/**
* @api {GET} /users Devolver lista de usuarios
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // acceder a la base de datos y devolver el json
});

module.exports = router;
