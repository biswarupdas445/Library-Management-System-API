const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Users = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isLibrarian = (req, res, next) => {
  Users.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Librarian") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Librarian Role!"
      });
      return;
    });
  });
};



isFacultyOrStudent = (req, res, next) => {
  Users.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Faculty") {
          next();
          return;
        }

        if (roles[i].name === "Student") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Faculty or Student Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isLibrarian: isLibrarian,
  isFacultyOrStudent: isFacultyOrStudent
};
module.exports = authJwt;