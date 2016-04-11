var express = require('express');
var router = express.Router({ mergeParams: true });
var comments = require('./comments');
var auth = require('../../../lib/authenticator');
var async = require('async');
var validate = require('../../../lib/validate');

var mongoose = require('mongoose');
require('../../../model/post');
var Post = mongoose.model('post');

router.get('/', function(req, res) {
    var topic = {}
    console.log(req.params.topicid);
    if(req.params.topicid != "all"){
        topic.topic = req.params.topicid;
    }
    Post.find(topic).sort({creation_date: -1}).exec(function(err, posts) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var postlist = [];
        async.eachSeries(posts, function(item, next) {
                var post = {
                    _id: item._id,
                    topic: item.topic,
                    title: item.title,
                    author: item.author,
                    creation_date: item.creation_date,
                    votes: (item.upvotes.length - item.downvotes.length),
                    description: item.description,
                    link: item.link,
                    creation_date: item.creation_date,
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
    var params = {
        topic: req.params.topicid, // required
        title: req.body.title, // required
        author: {
            _id: req.body.author._id, // required
            username: req.body.author.username // required
        },
        creation_date: new Date().toISOString(),
        description: req.body.description || null,
        link: req.body.link || undefined,
        thumbnail: req.body.thumbnail || undefined
    };

    console.log(params);

    var post = new Post(params);
    post.save(post, function(err, postdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var newpost = {
            _id: postdata._id,
            title: postdata.title,
            author: postdata.author,
            creation_date: postdata.creation_date,
            votes: (postdata.upvotes.length - postdata.downvotes.length),
            link: postdata.link,
            thumbnail: postdata.thumbnail,
            ncomments: postdata.ncomments
        }
        res.status(201).json({ post: newpost });
    });
});

router.get('/:postid', function(req, res) {
    Post.findOne({ topic: req.params.topicid, _id: req.params.postid }, function(err, postdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (postdata !== null) {
            var post = {
                _id: postdata._id,
                topic: postdata.topic,
                title: postdata.title,
                author: postdata.author,
                creation_date: postdata.creation_date,
                votes: (postdata.upvotes.length - postdata.downvotes.length),
                link: postdata.link,
                description: postdata.description,
                creation_date: postdata.creation_date,
                thumbnail: postdata.thumbnail,
                ncomments: postdata.ncomments
            };
            return res.status(200).json({ post: post });
        }
        res.status(200).json({ post: null });
    })
});

/**
 * @api {PUT} /topics/:topicid/posts/:postid Editar un post
 * @apiParam Object author
 * @apiParam String author._id id del usuario que ha creado el post
 * @apiParam String author.username nombre del usuario que ha creado el post
 * @apiParam String description descripcion inicial (opcional) del post
 */
router.put('/:postid', auth(), function(req, res) {
    Post.findOne({ '_id': req.params.postid }, function(err, postdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (postdata === null) {
            // el post no existe
            return res.status(422).json({ error: "post does not exist" });
        }
        // si usuario logueado coincide con autor del post
        console.log("Cookie username", req.session.user || "");
        console.log("Autor username", postdata.author.username || "");
        if (req.session.user === postdata.author.username) {
            var fields = {
                last_edit_date: new Date().toISOString(),
            };
            if (req.body.hasOwnProperty("description")) {
                fields.description = req.body.description;
            }
            console.log("Fields", fields);
            // modificar
            var options = {
                new: true
            }
            Post.findOneAndUpdate({ _id: req.params.postid }, { $set: fields }, options, function(err, editedpostdata) {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                var editedpost = {
                        _id: editedpostdata._id,
                        title: editedpostdata.title,
                        author: editedpostdata.author,
                        creation_date: editedpostdata.creation_date,
                        last_edit_date: editedpostdata.last_edit_date,
                        description: editedpostdata.description || null,
                        votes: (editedpostdata.upvotes.length - editedpostdata.downvotes.length),
                        link: editedpostdata.link,
                        thumbnail: editedpostdata.thumbnail,
                        ncomments: editedpostdata.ncomments
                    }
                    // editado correctamente
                return res.status(200).json({ post: editedpost });
            })
        } else {
            // el usuario logueado no es el autor del post -> mandar forbidden        
            res.status(403).json({ error: "you are not the author of this post" });
        }

    })

});

router.use('/:postid/comments', comments);

module.exports = router;
