'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const EventerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_address: { type: String, required: true },
  event_date: { type: Date, required: true }
});

// Compile model from the schema

module.exports = mongoose.model('Eventer', EventerSchema);
