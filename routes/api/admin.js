const router = require("express").Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const User = require("../../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const auth = require("../auth");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({
        $or: [
          { userName: { $regex: new RegExp("^" + email.toLowerCase(), "i") } },
          { email: { $regex: new RegExp("^" + email.toLowerCase(), "i") } },
        ],
      })
        .then(function (user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: { "Username or password": "is invalid" },
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
router.post("/createadmin", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        let user1 = new User();
        user1.firstname = req.body.firstname;
        user1.lasttname = req.body.lastname;
        user1.email = req.body.email;
        user1.setPassword(req.body.password), (user1.role = 1);
        user1.save();
        res.send("Registered successfuly");
      } else {
        res.send("User already exists");
      }
    })
    .catch((err) => {
      res.status(500).send({ error: "Something failed!" });
    });
});
router.post("/login", function (req, res) {
  console.log(req.body);
  passport.authenticate("local", { session: false }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.send("User not found");
    } else {
      res.send("You have logedin");
    }
  })(req, res);
});
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
