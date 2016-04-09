var express = require('express');
var router = express.Router({ mergeParams: true });
var auth = require('../../../lib/authenticator');
var async = require('async');
var validate = require('../../../lib/validate');

var mongoose = require('mongoose');
require('../../../model/comment');
var Comment = mongoose.model('comment');

router.get('/', function(req, res) {
    Comment.find({ post: req.params.postid }, function(err, comments) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var commentlist = [];
        async.eachSeries(comments, function(item, next) {
                var comment = {
                    _id: item._id,
                    post: item.post,
                    author: item.author,
                    creation_date: item.creation_date,
                    last_edit_date: item.last_edit_date,
                    votes: (item.upvotes.length - item.downvotes.length),
                    reference: item.reference,
                    text: item.text,
                }
                commentlist.push(comment);
                next();
            },
            function end(err) {
                res.status(200).json({ comments: commentlist });
            }
        );
    })
});

/**
 * @api {POST} /topics/:topicid/posts/:postid/comments Crear un comentario
 * @apiParam author Object
 * @apiParam String author._id id del usuario que ha creado el comentario
 * @apiParam String author.username nombre del usuario que ha creado el comentario 
 * @apiParam String text texto del comentario
 * @apiParam String reference id del comentario respuesta (si es null es referente al post)
 */
router.post('/', auth(), function(req, res) {
    var params = {
        post: req.params.postid,
        author: {
            _id: req.body.author._id,
            username: req.body.author.username
        },
        creation_date: Date().toISOString(),
        reference: req.body.reference,
        text: req.body.text
    };
    var comment = new Comment(params);
    comment.save(comment, function(err, commentdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var newcomment = {
            _id: commentdata._id,
            author: commentdata.author,
            creation_date: commentdata.creation_date,
            last_edit_date: commentdata.last_edit_date,
            votes: (commentdata.upvotes.length - commentdata.downvotes.length),
            reference: commentdata.reference,
            text: commentdata.text,
        }
        res.status(201).json({ comment: newcomment });
    });
});

router.get('/:commentid', function(req, res) {
    Comment.findOne({ post: req.params.postid, _id: req.params.commentid }, function(err, commentdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (commentdata !== null) {
            var comment = {
                _id: commentdata._id,
                post: commentdata.post,
                author: commentdata.author,
                creation_date: commentdata.creation_date,
                last_edit_date: commentdata.last_edit_date,
                votes: (commentdata.upvotes.length - commentdata.downvotes.length),
                reference: commentdata.reference,
                text: commentdata.text,
            };
            return res.status(200).json({ comment: comment });
        }
        res.status(200).json({ comment: null });
    })
});

/**
 * @api {PUT} /topics/:topicid/posts/:postid/comments/:commentid Editar un comentario
 * @apiParam author Object
 * @apiParam String author._id id del usuario que ha creado el comentario
 * @apiParam String author.username nombre del usuario que ha creado el comentario 
 * @apiParam String text texto del comentario
 * @apiParam String reference id del comentario respuesta (si es null es referente al post)
 */
router.put('/:commentid', auth(), function(req, res) {
    Comment.findOne({ '_id': req.params.commentid }, function(err, commentdata) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (commentdata === null) {
            // el comentario no existe
            return res.status(422).json({ error: "comment does not exist" });
        }
        // si usuario logueado coincide con autor del comentario
        console.log("Cookie username", req.session.user || "");
        console.log("Autor username", commentdata.author.username || "");
        if (req.session.user === commentdata.author.username) {
            var fields = {
                last_edit_date: Date().toISOString(),
            };
            if (req.body.hasOwnProperty("text")) {
                fields.text = req.body.text;
            }
            console.log("Fields", fields);
            // modificar
            var options = {
                new: true
            }
            Comment.findOneAndUpdate({ _id: req.params.commentid }, { $set: fields }, options, function(err, editedcommentdata) {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                var editedcomment = {
                        _id: editedcommentdata._id,
                        post: editedcommentdata.post,
                        author: editedcommentdata.author,
                        creation_date: editedcommentdata.creation_date,
                        last_edit_date: editedcommentdata.last_edit_date,
                        votes: (editedcommentdata.upvotes.length - editedcommentdata.downvotes.length),
                        reference: editedcommentdata.reference,
                        text: editedcommentdata.text
                    }
                    // editado correctamente
                return res.status(200).json({ comment: editedcomment });
            })
        } else {
            // el usuario logueado no es el autor del comentario -> mandar forbidden        
            res.status(403).json({ error: "you are not the author of this comment" });
        }

    })
});

module.exports = router;
