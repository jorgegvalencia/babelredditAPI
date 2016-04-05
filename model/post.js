'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var postSchema = mongoose.Schema({
    topic: String, // abrev del topic al que pertenece
    title: String, // título del post
    author: {
        _id: String, // id del usuario que ha creado el post
        username: String, // nombre del usuario que ha creado el post
    },
    creation_date: {type: String, default: Date()}, // string en formato ISO de la fecha de creación
    last_edit_date: String, // string en formato ISO de la última fecha de creación
    upvotes: [String], // id de usuarios que han votado positivamente
    downvotes: [String], // id de usuarios que han votado negativamente
    description: String, // descripcion inicial (opcional) del post
    link: String, // String de una URL externa, o uri del propio post
    thumbnail: String, // uri local del fichero de la imagen (**)
    ncomments: Number // numero de comentarios
});

var Post = mongoose.model('post', postSchema);
