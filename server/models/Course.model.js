const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL of course thumbnail
  category: { type: String, required: true },
});

module.exports = mongoose.model("Course", CourseSchema);
