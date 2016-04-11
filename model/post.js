'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var postSchema = mongoose.Schema({
    topic: String, // abrev del topic al que pertenece
    title: String, // título del post
    author: {
        _id: { type: String, required: true }, // id del usuario que ha creado el post
        username: {type: String, required: true } // nombre del usuario que ha creado el post
    },
    creation_date: {type: String }, // string en formato ISO de la fecha de creación
    last_edit_date: String, // string en formato ISO de la última fecha de creación
    upvotes: {type: [String], default: []}, // id de usuarios que han votado positivamente
    downvotes: {type: [String], default: []}, // id de usuarios que han votado negativamente
    description: String, // descripcion inicial (opcional) del post
    link: String, // String de una URL externa, o uri del propio post
    thumbnail: {type: String, default: "dist/default_thumbnail.png"}, // uri local del fichero de la imagen (**)
    ncomments: {type: Number, default: 0} // numero de comentarios
});

var Post = mongoose.model('post', postSchema);
