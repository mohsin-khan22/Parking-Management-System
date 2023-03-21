const router = require("express").Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const User = require("../../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const auth = require("../auth");

router.get("/userlist", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    User.find()
      .populate()
      .exec((err, result) => {
        if (err) {
          res.status(401).send(err);
        } else if (result) {
          res.status(200).send(result);
        }
      });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/deleteUser", auth.isToken, auth.isAdmin, (req, res) => {
  try {
    User.deleteOne({ email: req.body.email }, (err, data) => {
      if (err) {
        res.status(500).send("User not found");
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.send("User cannot be deleted");
  }
});
module.exports = router;
