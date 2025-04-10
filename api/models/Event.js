const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  createdBy: { type: String, required: true }, // 👈 Track creator
});

module.exports = mongoose.model("Event", eventSchema);
