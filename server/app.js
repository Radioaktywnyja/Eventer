const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

// // MongoDB connection url
const mongoURL = require('./mongoUrl');

const http = require('http');

// Connect to MongoDB
mongoose.connect( mongoURL, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('connected to the database'));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Import routes
const routes = require('./routes/index')();
app.use('/', routes);

module.exports = app;