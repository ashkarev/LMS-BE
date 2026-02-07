const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  students: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

const courseModel = mongoose.model("courses", courseSchema);

module.exports = courseModel;
