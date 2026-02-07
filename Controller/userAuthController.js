const userModel = require("../Model/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let { userName, password, email } = req.body;
    if (userName && password && email) {
      // hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      //checking its there
      let existingUser = await userModel.findOne({ email: email }); //checking for exixsting user
      if (existingUser) {
        res.status(409).json({ message: "This User is already Registered" });
      } else {
        let newuser = new userModel({
          userName,
          password: hashedPassword,
          email,
        });
        await newuser.save();
        res.status(201).json({ message: "Successfully Registered", newuser });
      }
    } else {
      res.status(400).json({ message: "Please fill the form " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server crashed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {


      const isMatch = await bcrypt.compare(password, existingUser.password);
      console.log("Password match result:", isMatch);

      if (isMatch) {
        let payload = {
          userName: existingUser.userName,

          email: existingUser.email,
          userType: existingUser.userType,
        };

        let token = jwt.sign(payload, process.env.jwtSecretKey);
        res
          .status(200)
          .json({ message: "successfully login", token, existingUser });
      } else {
        res.status(400).json({ message: "password is wrong" });
      }
    } else {
      res.status(400).json({ message: "User Didnt exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server crashed" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;
    if (!email || !userName) {
      return res.status(400).json({ message: "Email and User Name are required" });
    }
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      let payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        userType: existingUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecretKey);
      res
        .status(200)
        .json({ message: "Successfully login", token, existingUser });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("googlePassword", saltRounds);
      let newUser = new userModel({
        userName,
        email,
        password: hashedPassword,
        proPic,
      });
      await newUser.save();
      let payload = {
        userName: newUser.userName,
        email: newUser.email,
        userType: newUser.userType,
      };
      let token = jwt.sign(payload, process.env.jwtSecretKey);
      res
        .status(201)
        .json({ message: "successfully registered", token, newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server crashed at google login" });
  }
};



