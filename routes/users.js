var express = require('express');
var router = express.Router();
var posts = require('./posts.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/posts', posts);

module.exports = router;
