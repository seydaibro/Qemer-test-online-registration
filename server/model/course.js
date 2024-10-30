const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: { type: String, required: true, unique:true },
  duration: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  studentsEnrolled: { type: Number, default: 0 }, // New field for enrolled students count
  description: { type: String, required: false }, // Optional field for course description
  prerequisites: { type: String, required: false }, // Optional field for course prerequisites
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
