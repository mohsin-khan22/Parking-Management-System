const mongoose = require("mongoose");

const User = require("../../models/User");
const auth = require("../auth");
const router = require("express").Router();
const passport = require("passport");
//const { sendEmailVerificationOTP } = require("../../utilities/mailer");
const mailer = require("../../utilities/mailer");
let frontend = require("../../config").frontend;
let backend = require("../../config").backend;
let bcrypt = require("bcrypt");
//const LocalStrategy = require("passport-local");
router.get("/context", auth.isToken, auth.isUser, (req, res, next) => {
  return res.status(200).send(req.user.toAuthJSON());
});
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
          return res.status(400).send("Input fields required!");
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
/*router.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    // Get the OTP generated on the server
    const user = await User.findOne({ email }); // Replace this with your database call

    if (otp === user.otp) {
      return res.status(200).send({ message: "OTP verified successfully!" });
    } else {
      return res.status(400).send("Invalid OTP");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});*/
router.put(
  "/update-password",
  auth.isToken,
  auth.isUser,
  async (req, res, next) => {
    if (!req.body.oldPassword || !req.body.password)
      return res.status(401).send("Missing Required Parameters");

    if (req.body.oldPassword.length <= 0 || req.body.password.length <= 0)
      return res.status(400).send("Missing Required Parameters");

    if (req.body.oldPassword === req.body.password)
      return res
        .status(422)
        .send("Old password and new password cannot be same");

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).send(error.message);
      }

      const hashedPassword = user.password;
      const passwordMatch = await bcrypt.compare(
        req.body.oldPassword,
        hashedPassword
      );

      if (passwordMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedNewPassword;
        await user.save();

        return res
          .status(200)
          .send({ message: "Password has been changed successfully" });
      } else {
        return res.status.apply(422).send("Invalid Old Password!!");
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);
router.post("/verify-otp/:type", async (req, res, next) => {
  console.log("req params", req.params.type);

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(422).send("Missing Required parameters");
  }

  //let query = {
  //email: email,
  //};

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).send("User not found");
  }
  console.log(user.otp, otp);
  if (user.otp != otp) {
    return res.status(400).send("Invalid OTP");
  }

  user.otp = null;
  user.status = "active";
  user.otpExpires = null;

  if (+req.params.type === 1) {
    user.isOtpVerified === true;
  } else {
    user.generatePasswordRestToken();
  }

  await user.save().then((user) => {
    if (+req.params.type === 1) {
      return res.status(200).send(user.toAuthJSON());
    } else if (+req.params.type === 2) {
      return res
        .status(200)
        .send({ passwordRestToken: user.resetPasswordToken, user });
    }
  });
});

router.post("/otpresend", async (req, res, next) => {
  let email = req.body.email;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(423).send("User not found");
    }
    user.otp = null;

    user.setOTP();

    user
      .save()
      .then((result) => {
        mailer.sendEmailVerificationOTP(result);
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});
/*router.post("/resetPassword/:email/:passwordRestToken", (req, res, next) => {
  if (
    req.user.resetPasswordTokenn === req.params.resetPasswordToken &&
    req.user.otpExpires > Date.now()
  ) {
    if (!req.body.password || req.body.password == "")
      return res.status(422).send("Missing Required Parameters");
    req.user.setPassword(req.body.password);
    req.user.save(function (err) {
      if (err) return res.status(400).send(err);
      return res.status(200).send({
        message: "Password has been changed successfully",
        role: req.userToUpdate.role,
      });
    });
  } else return res.status(400).send("Invalid OTP");
});*/
router.post(
  "/resetPassword/:email/:passwordRestToken",
  async (req, res, next) => {
    let email = req.params.email;

    console.log("token", req.body);

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send("User not found");
      }

      // if (!req.body.passwordRestToken || !req.body.password) {
      // return res.status(422).send("Missing Required Parameters");
      //}
      if (req.params.resetPasswordToken !== user.resetPasswordToken) {
        return res.status(400).send("Invalid Password Reset Token");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
      await user
        .save()
        .then((result) => {
          return res.status(200).send({
            message: "Password has been changed successfully",
          });
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);
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
router.post("/forgot", async (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).send("Missing required parameter.");
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(422).send("User does not exist.");
  }
  user.setOTP();
  user.isOtpVerified = true;

  user
    .save()
    .then((result) => {
      mailer.sendEmailVerificationOTP(result);
      return res
        .status(200)
        .send({ result, message: "Otp sent SUCCESSFUL to this Email" });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.post("/update-password", auth.isToken, (req, res, next) => {
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
