let mongoose = require("mongoose");
let router = require("express").Router();
let User = mongoose.model("User");
let auth = require("../auth");
let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
let frontend = require("../../config").frontend;
let backend = require("../../config").backend;

//get user from email address
router.param("email", (req, res, next, email) => {
  // console.log("---------email---------", email);
  User.findOne({ email }, (err, user) => {
    if (err) return next(new BadRequestResponse(err));
    if (!user) return next(new BadRequestResponse("User not found!", 423));
    req.userToUpdate = user;
    return next();
  });
});

// verify Email
router.get("/email/:email/:OTP", (req, res, next) => {
  let user = req.userToUpdate;
  // console.log("----------req.params----------", req.params);
  if (user.otp === req.params.otp) {
    user.isEmailVerified = true;
    user.otp = null;
    user.save((err, data) => {
      if (err) return next(new BadRequestResponse(err));
      // console.log("email verified", data);
      // emitEvent(data.email + "emailVerified");
      res.send(data.email);
    });
  } else {
    return next(new BadRequestResponse("Invalid OTP"));
  }
});
module.exports = router;
