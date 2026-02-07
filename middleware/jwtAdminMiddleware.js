const jwt = require("jsonwebtoken");

const jwtAdminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token required, please login" });
    }

    const token = authHeader.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.jwtSecretKey);
      if (decodedData) {
        if (decodedData.userType == 'admin') {
          req.user = decodedData.email;
          next();
        }
        else {
          res.status(403).json({ message: "This action can only be performed by an admin" })
        }
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

module.exports = jwtAdminMiddleware;
