const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  time: String,
  location: String,
  description: String
});

module.exports = mongoose.model("Event", eventSchema);
