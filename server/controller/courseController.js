
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


const getAllBrands = async (req, res) => {
  try {
    const brands = await query("SELECT * FROM brands");
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneBrand = async (req, res) => {
  const { BrandId } = req.params;

  try {
    const [brand] = await query("SELECT * FROM brands WHERE _id = ?", [
      BrandId,
    ]);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const removeBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM brands WHERE _id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    return res.status(200).json({ _id: id });
  } catch (error) {
     return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBrand = async (req, res) => {
  const BrandId = req.params.id;
  const updatedData = req.body;

  try {
    const lowercaseName = updatedData.name.toLowerCase();
    const existingBrand = await query(
      "SELECT * FROM brands WHERE name = ? AND _id != ?",
      [lowercaseName, BrandId]
    );
    if (existingBrand.length > 0) {
      return res
        .status(400)
        .json({ error: "Brand with the same name already exists" });
    }

    const result = await query("UPDATE brands SET ? WHERE _id = ?", [
      updatedData,
      BrandId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Brand not found" });
    }

    return res.status(200).json({ _id: BrandId, ...updatedData });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
addCourse
};


