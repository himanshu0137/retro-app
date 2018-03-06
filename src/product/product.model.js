'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  sprints: [{type: Schema.Types.ObjectId, ref: 'Sprint'}]
});

module.exports = mongoose.model('Product', ProductSchema);
