const applicationModel = require("../Model/applicationModel");

exports.ApplyJob = async (req, res) => {
  try {
    let { fullName, email, phone, jobId, jobTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    let resume = req.file.filename;

    let existingApplication = await applicationModel.findOne({ email, jobId });

    if (existingApplication) {
      res.status(409).json({ message: "You have already applied for this job" });
    } else {
      let newApplication = new applicationModel({
        fullName,
        email,
        phone,
        jobId,
        jobTitle,
        resume,
      });
      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully", newApplication });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while submitting the application" });
  }
};


exports.getJob = async (req, res) => {
  try {
    let allApplications = await applicationModel.find();
    res.status(200).json({ applications: allApplications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error" });
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await applicationModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting application" });
  }
}
