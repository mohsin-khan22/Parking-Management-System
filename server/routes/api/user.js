const mongoose = require("mongoose");

const User = require("../../models/User");
const auth = require("../auth");
const router = require("express").Router();
const passport = require("passport");
//const { sendEmailVerificationOTP } = require("../../utilities/mailer");
const mailer = require("../../utilities/mailer");
let frontend = require("../../config").frontend;
let backend = require("../../config").backend;
//const LocalStrategy = require("passport-local");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    console.log(user);
    if (user) {
      return res.status(423).send("user already exists");
    }
    if (user === null) {
      let user1 = new User();
      user1.firstName = req.body.firstName;
      user1.lastName = req.body.lastName;
      user1.email = req.body.email;
      user1.setPassword(req.body.password), (user1.role = 0);
      user1.setOTP();
      //user1.link = `${backend}/api/verify/email/${user1.email}}`;

      user1
        .save()
        .then((result) => {
          mailer.sendEmailVerificationOTP(result);
          return res.status(200).send(result);
        })
        .catch((err) => {
          return res.status(400).send(err);
        });
    }
  });
});

router.post("/login", function (req, res) {
  console.log(req.body);
  // console.log(process.env.TOKEN_KEY);
  passport.authenticate("local", { session: false }, function (err, user) {
    console.log(err, user);
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res
        .status(423)
        .send("Either incorrect email/password or user does not exist.");
    }
    // console.log(user.toAuthJSON());
    return res.send(user.toAuthJSON());
  })(req, res);
});
router.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    // Get the OTP generated on the server
    const user = await User.findOne({ email }); // Replace this with your database call

    if (otp === user.otp) {
      return res.status(200).send({ message: "OTP verified successfully!" });
    } else {
      return res.status(400).send({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.post("/otpresend", async (req, res, next) => {
  let email = req.params.email;
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return next(new BadRequestResponse("User not found"));
    }
    user.otp = null;

    user.setOTP();

    user
      .save()
      .then((result) => {
        emailService.sendEmailVerificationOTP(result);
        return next(new OkResponse(result));
      })
      .catch((err) => {
        return next(new BadRequestResponse(err));
      });
  } catch (err) {
    return next(new BadRequestResponse(err));
  }
});

router.post("/updateprofile", auth.isToken, async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.user.email });
    if (oldUser) {
      oldUser.firstName = req.body.firstName;
      oldUser.lastName = req.body.lastName;
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
