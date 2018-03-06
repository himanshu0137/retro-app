const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oneWeekInMilliseconds = 7*24*60*60*1000;

const SprintSchema = new Schema({
  name: String,
  startDate: {type: Date, default: Date.now()},
  endDate: {type: Date, default: new Date(+new Date() + oneWeekInMilliseconds)},
  retros: [{type: Schema.Types.ObjectId, ref: 'Retros'}]
});

module.exports = mongoose.model('Sprint', SprintSchema);
