const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

const isToken = function (req, res, next) {
  var token = req.headers.authorization.split(" ");
  if (typeof token[1] === "undefined" || typeof token[1] === null) {
    res
      .status(401)
      .send({ message: "Please login first to continue further!" });
  } else {
    jsonwebtoken.verify(token[1], process.env.TOKEN_KEY, (err, data) => {
      if (err) {
        res
          .status(401)
          .send({ message: "Please login first to continue further!" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

const isUser = function (req, res, next) {
  User.findOne({ email: req.user.email }, (err, user) => {
    if (err) {
      res.status(401).send({ message: "You are not logged in" });
    } else {
      req.user = user;
      next();
    }
  });
};
const isAdmin = function (req, res, next) {
  User.findOne({ email: req.user.email }, (err, user) => {
    if (err) {
      res.status(401).send({ message: "You are not logged in" });
    } else if (user) {
      console.log(user);
      if (user.role === 1) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ message: "You are not admin" });
      }
      //req.user = user;
      // next();
    }
  });
};

const isStaff = function (req, res, next) {
  if (req.user.role === 2) {
    next();
  } else res.status(401).send({ message: "You are not admin" });
};

module.exports = { isAdmin, isUser, isStaff, isToken };
