const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let crypto = require("crypto");
let uniqueValidator = require("mongoose-unique-validator");
const { secret } = require("../config/env/development");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    isOtpVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    hash: { type: String, default: null },
    salt: String,
    role: {
      type: Number, // 0=user, 1=admin, 2=staff
      default: 0,
    },
  },
  { timestamps: true }
);
userSchema.methods.setOTP = function () {
  this.otp = Math.floor(1000 + Math.random() * 9000);
  this.otpExpires = Date.now() + 3600000; // 1 hour
};

userSchema.plugin(uniqueValidator, { message: "Taken" });
userSchema.methods.validPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  console.log(this.hash);
  console.log(hash);
  console.log(this.hash === hash);
  return this.hash === hash;
};

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};
userSchema.methods.generatePasswordRestToken = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
};
userSchema.methods.generateJWT = function () {
  return jwt.sign({ user_id: this._id, email: this.email }, secret, {
    expiresIn: "24h",
  });
};

userSchema.methods.toJSON = function () {
  return {
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    otp: this.otp,
    otpExpires: this.otpExpires,
    isOtpVerified: this.isOtpVerified,
    isEmailVerified: this.isEmailVerified,
  };
};

userSchema.methods.toAuthJSON = function () {
  return {
    token: this.generateJWT(),
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
    otp: this.otp,
    otpExpires: this.otpExpires,
    isOtpVerified: this.isOtpVerified,
    isEmailVerified: this.isEmailVerified,
  };
};
module.exports = mongoose.model("User", userSchema);
