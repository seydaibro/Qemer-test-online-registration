const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 1,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false,
    trim: true
  },
  courses: {
    type: [String], // Array of strings, could be course names or IDs
    default: []
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: true
  },
  permissions:[{type:mongoose.Schema.Types.ObjectId, ref:"Permission"}],
});

module.exports = mongoose.model("User", UserSchema); // Your Mongoose user model
