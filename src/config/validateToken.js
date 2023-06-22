const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECERT } = require("./env");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let headers = req.headers.authorization;
    if (!headers) {
      res
        .status(401)
        .send({ message: "User is not authorized or token is missing" });
    } else {
      token = headers.split(" ")[1];
      jwt.verify(token, ACCESS_TOKEN_SECERT, (error, decoded) => {
        if (error) {
          res.status(401).send({ message: "user is not authorized" });
        }
        req.user = decoded.user;
        next();
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = validateToken;
