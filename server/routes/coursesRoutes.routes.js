const express = require("express");
const router = express.Router();
const Course = require("../models/Course.model");
const cloudinary = require("cloudinary").v2;

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a New Course with Image Upload
router.post("/new", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.files.course_cover_img; // Get uploaded file

    if (!title || !description || !category || !file) {
      return res
        .status(400)
        .json({ message: "All fields and image are required" });
    }

    // Upload Image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
    // console.log("Uploaded Image URL:", uploadResult.secure_url);

    // Create a new Course
    const newCourse = new Course({
      title,
      description,
      image: uploadResult.secure_url, // Store Cloudinary URL
      category,
    });

    await newCourse.save();
    // console.log("Course created:", newCourse);

    res
      .status(201)
      .json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a course
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const courseId = req.params.id;

    // Check if the course exists
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    let updatedData = { title, description, category };

    // Handle image update if a file is provided
    if (req.files && req.files.image) {
      const file = req.files.image;

      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);

      // Add the new image URL to the updated data
      updatedData.image = uploadResult.secure_url;

      // Optional: Delete old image from Cloudinary if needed
      if (existingCourse.image) {
        const oldImagePublicId = existingCourse.image
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(oldImagePublicId);
      }
    }

    // Update course in the database
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });

     // Check if the blog had an image and delete it from Cloudinary
     if (deletedCourse.image) {
        const imageId = deletedCourse.image.split('/').pop().split('.')[0]; // Extract the image ID from the URL
        await cloudinary.v2.uploader.destroy(imageId); // Delete image from Cloudinary
        console.log('Cloudinary image deleted successfully');
      }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

module.exports = router;
