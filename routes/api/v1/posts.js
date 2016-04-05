var express = require('express');
var router = express.Router({ mergeParams: true });
var comments = require('./comments');
var auth = require('../../../lib/authenticator');
var async = require('async');

var mongoose = require('mongoose');
require('../../../model/post');
var Post = mongoose.model('post');

router.get('/', function(req, res) {
    Post.find({ topic: req.params.topicid }, function(err, posts) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var postlist = [];
        async.eachSeries(posts, function(item, next) {
                var post = {
                    _id: item._id,
                    title: item.title,
                    author: item.author,
                    creation_date: item.creation_date,
                    votes: (item.upvotes.length - item.downvotes.length),
                    link: item.link,
                    thumbnail: item.thumbnail,
                    ncomments: item.ncomments
                }
                postlist.push(post);
                next();
            },
            function end(err) {
                res.status(200).json({ posts: postlist });
            }
        );
    })
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
router.post('/', auth(), function(req, res) {
    // body...
});

router.get('/:postid', function(req, res) {
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
router.put('/:postid', auth(), function(req, res) {
    // body...
    // si usuario logueado coincide con autor del post
    // modificar
    // sino, mandar forbidden
});

router.use('/:postid/comments', comments);

module.exports = router;
