const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validator = require('express-validator');

const routes = require('./src/routes');

const port = 3000;
const mongodbUrl = 'mongodb://arshmeet:arshmeet@ds229468.mlab.com:29468/retro-app';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(validator());
app.use(cors());

app.use('/api', routes);

mongoose.connect(mongodbUrl, {useMongoClient: true});

app.listen(3000, () => {
    console.log('app started on port: ', port);
});

module.exports = app;