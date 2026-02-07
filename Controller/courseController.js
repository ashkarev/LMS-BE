const courseModel = require("../Model/courseModel");

exports.addCourse = async (req, res) => {
    try {
        const { title, instructor, price, students, description } = req.body;

        // Check if course with same title exists (optional, but good for stability)
        const existingCourse = await courseModel.findOne({ title });
        if (existingCourse) {
            return res.status(409).json({ message: "Course with this title already exists" });
        }

        const newCourse = new courseModel({
            title,
            instructor,
            price,
            students: students || 0,
            description: description || "",
            img: req.file ? req.file.filename : ""
        });

        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", newCourse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Failed to add course" });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await courseModel.find();
        res.status(200).json(allCourses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Failed to fetch courses" });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await courseModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Failed to delete course" });
    }
};
