'use strict';

var mongoose = require('mongoose');

// creamos la conexion con la base de datos
var conn = require('../lib/dbmanager');

var topicSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  nsubs: {type: Number },
  rules: {type: String },
  category: {type: String, default: 'N/A' }
});

var Topic = mongoose.model('topic', topicSchema);
