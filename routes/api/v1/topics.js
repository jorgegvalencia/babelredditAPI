var express = require('express');
var router = express.Router();
var posts = require('./posts');
var auth = require('../../../lib/authenticator');
var async = require('async');

var mongoose = require('mongoose');
require('../../../model/topic');
var Topic = mongoose.model('topic');

/**
 * @api {GET} /topics Obtener la lista de topics
 */
router.get('/', function(req, res) {
    Topic.find({}, function(err, topics) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        var topiclist = [];
        async.eachSeries(topics, function(item, next) {
                topiclist.push({ _id: item._id, title: item.title, nsubs: item.nsubs });
                next();
            },
            function end(err) {
                res.status(200).json({ topics: topiclist });
            }
        );
    })
});

/**
 * @api {POST} /topics Crear un nuevo topic
 * @apiParam String title título del topic
 * @apiParam String description descripción del topic
 * @apiParam String rules texto con las reglas del topic
 * @apiParam String category id de la categoria del topic, seleccionada de un listado inicial
 */
router.post('/', auth(), function(req, res) { // cambiar auth() por admin()
    // body...
    res.status(200).json({ result: "nuevo topic insertado" });
});

/**
 * @api {GET} /topics/:topicid Obtener los datos de un topic
 */
router.get('/:topicid', function(req, res) {
    var topicid = req.params.topicid;
    var alphanumeric = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (alphanumeric.test(topicid)) {
        Topic.find({ _id: topicid }, function(err, topic) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({ topic: topic });
        })
    }
    else {
    	res.status(400).json({ error: "wrong topicid format" });
    }
});

/**
 * @api {POST} /topics/:topicid Editar los datos de un topic
 * @apiParam String title título del topic
 * @apiParam String description descripción del topic
 * @apiParam String rules texto con las reglas del topic
 * @apiParam String category id de la categoria del topic, seleccionada de un listado inicial
 */
router.put('/:topicid', auth(), function(req, res) { // cambiar auth() por admin()
    // body...
});

router.use('/:topicid/posts', posts);

module.exports = router;
