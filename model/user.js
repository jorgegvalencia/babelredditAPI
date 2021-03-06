'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true}, // nickname del usuario
    email: {type: String, required: true, unique: true}, // email del usuario
    password: String, // hash de la contraseña del usuario
    topics: [{topicid: String, topicname: String}], // topics a los que esta suscrito el usuario
});

var User = mongoose.model('user', userSchema);