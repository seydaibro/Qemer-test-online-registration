const User = require("../model/user");
const Course = require("../model/course")
const Permission = require("../model/permission");
const bcrypt = require("bcryptjs");




const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("permissions courses")
      .select("-password"); // Exclude password field from the results

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error while fetching users" });
  }
};


const editUser = async (req, res) => {
  console.log("Editing User", req.body);
  const userId = req.params.id;
  try {
    const { firstName, surname, age, courses, email, password, phone_number } = req.body;

    // Find the existing user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if they are provided
    user.firstName = firstName || user.firstName;
    user.surname = surname || user.surname;
    user.age = age || user.age;
    user.courses = courses || user.courses;
    user.email = email || user.email;
    user.phone_number = phone_number || user.phone_number;

    // Update password if a new one is provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save updated user data
    await user.save();

    user.password = undefined; // Hide password in response
    const updatedUser = await user.populate("courses");
    return res.status(200).json( updatedUser );
  } catch (error) {
    console.error("Error during user update:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log("get user by id is called", req.params.id)
    const  id  = req.params.id; // Get the user ID from the request parameters
    const user = await User.findById(id)
      .populate("permissions courses")
      .select("-password"); // Exclude password from the results

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "Server error while fetching user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
      console.log("deleted user contorller is now", userId)
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      console.log("user is not found")
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json(userId);
  } catch (error) {
    console.log("erro", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const registerToCourse = async (req, res) => {
  const { user_id, course_id } = req.body; // Extract userId and courseId from the request body
  console.log("register to course is called ", req.body);

  try {
      // Step 1: Find the user
      const user = await User.findById(user_id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Step 2: Add course ID to the user's coursesArray
      if (!user.courses?.includes(course_id)) {
          user.courses?.push(course_id);
          await user.save(); // Save the updated user
      }

      // Step 3: Increment the number of enrolled students in the course
      const course = await Course.findById(course_id); // Change courseId to course_id
      if (!course) {
          return res.status(404).json({ message: "Course not found" });
      }

      course.enrolledStudents += 1; // Increment enrolled students
      await course.save(); // Save the updated course

      return res.status(200).json({ message: "Successfully registered to course", user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  getAllUsers,
  editUser,
  deleteUser,
  registerToCourse,
  getUserById
};
