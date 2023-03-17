const mongoose = require("mongoose");

const User = require("../../models/User");
const auth = require("../auth");
const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");

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

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (user === null) {
        let user1 = new User();
        user1.firstname = req.body.firstname;
        user1.lastname = req.body.lastname;
        user1.email = req.body.email;
        user1.setPassword(req.body.password), (user1.role = 0);
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
  console.log(process.env.TOKEN_KEY);
  passport.authenticate("local", { session: false }, function (err, user) {
    console.log(err, user);
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.send("User not found");
      return;
    } else {
      console.log(user.toAuthJSON());
      res.send(user.toAuthJSON());
      return;
    }
  })(req, res);
});
router.post("/updateprofile", auth.isToken, async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.user.email });
    if (oldUser) {
      oldUser.firstname = req.body.firstname;
      oldUser.lastname = req.body.lastname;
      oldUser.save().then(() => res.status(200).send(oldUser));
    } else {
      res.status(404).send("User Not Found!");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/update-password", auth.isToken, auth.isUser, (req, res, next) => {
  console.log(req.user);
  if (!req.body.password || req.body.password == "")
    res.status(404).send("All input fields are required!");
  req.user.setPassword(req.body.password);
  req.user.save(function (err, result) {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
