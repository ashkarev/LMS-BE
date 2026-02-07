const userModel = require("../Model/userModel");

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let userDetails;
    if (id) {
      userDetails = await userModel.findById(id);
    } else {
      const email = req.user;
      userDetails = await userModel.findOne({ email });
    }

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Crashed" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, bio, phone } = req.body;

    let updateData = {
      userName,
      bio,
      phone,
    };

    if (req.file) {
      updateData.proPic = req.file.filename;
    }

    const userDetails = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Successfully Edited",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Crashed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
