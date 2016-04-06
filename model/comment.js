'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var commentSchema = mongoose.Schema({
    post: String, // id del post al que pertenece
    author: {
        _id: { type: String, required: true }, // id del usuario que ha creado el post
        username: {type: String, required: true } // nombre del usuario que ha creado el post
    },
    creation_date: { type: String }, // string en formato ISO de la fecha de creación
    last_edit_date: String, // string en formato ISO de la última fecha de creación
    text: String, // texto del comentario
    upvotes: [String], // id de usuarios que han votado positivamente
    downvotes: [String], // id de usuarios que han votado negativamente
    reference: { type: String, default: null } // id del comentario respuesta (si es null es referente al post)
});

var Comment = mongoose.model('comment', commentSchema);
