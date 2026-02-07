const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Auth Header:", authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "Token required, please login" });
    }

    const token = authHeader.split(" ")[1];

    if (token) {
      let decodedData = jwt.verify(token, process.env.jwtSecretKey);
      if (decodedData) {
        req.user = decodedData.email;
        next();
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Token required, please login" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid or expired token, please login" });
  }
};
module.exports = jwtMiddleware;
