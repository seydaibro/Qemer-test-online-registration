
const Course = require("../model/course");

// Add a new course
const addCourse = async (req, res) => {
  const { name, duration, imageUrl, description, prerequisites } = req.body;
  console.log("Add course is called", req.body);

  // Validate input
  if (!name || !duration || !imageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check for unique course name
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: "Course name must be unique." });
    }

    // Create and save the new course
    const newCourse = new Course({
      name,
      duration,
      imageUrl,
      description,  // Add description field
      prerequisites, // Add prerequisites field
    });
    
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    // Check if there are no courses found
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found." });
    }

    // Respond with the list of courses
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
  const deleteCourse = async (req, res) => {
    const { id } = req.params; // Get the course ID from the request parameters
  
    try {
      // Find and delete the course by ID
      const deletedCourse = await Course.findByIdAndDelete(id);
  
      // Check if the course was found and deleted
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found." });
      }
  
      // Respond with a success message
      res.status(200).json({ message: "Course deleted successfully." });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
}

const editCourse = async (req, res) => {
  const { id } = req.params;
  const { name, duration, imageUrl, description, prerequisites } = req.body;

  console.log("Edit course is called", req.body);

  // Validate input
  if (!name || !duration || !imageUrl) {
    return res.status(400).json({ message: "Name, duration, and image URL are required." });
  }

  try {
    // Check if the course with the given ID exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check for unique course name if it’s updated
    if (name !== course.name) {
      const existingCourse = await Course.findOne({ name });
      if (existingCourse) {
        return res.status(400).json({ message: "Course name must be unique." });
      }
    }

    // Update the course fields
    course.name = name;
    course.duration = duration;
    course.imageUrl = imageUrl;
    course.description = description;
    course.prerequisites = prerequisites;

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};




const deleteCourse = async (req, res) => {
  const { id } = req.params; // Get the course ID from the request parameters
  try {
    // Find and delete the course by ID
   await Course.findByIdAndDelete(id);

  res.status(200).json(id);
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
addCourse,
getAllCourses,
editCourse,
deleteCourse
};


