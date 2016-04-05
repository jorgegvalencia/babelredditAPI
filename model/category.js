'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var categorySchema = mongoose.Schema({
    categoryname: String, // nombre de la categoría
    topics: [{ topicid: String, topicname: String }], // topics que pertenecen a la categoría
});

var Category = mongoose.model('category', categorySchema);
