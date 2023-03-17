const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let crypto = require("crypto");
let uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },

    hash: { type: String, default: null },
    salt: String,
    role: {
      type: Number, // 0=user, 1=admin, 2=staff
      default: 0,
    },
  },
  { timestamps: true }
);
//userSchema.plugin(uniqueValidator, { message: "Taken" });
userSchema.methods.validPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { user_id: this._id, email: this.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
};

userSchema.methods.toJSON = function () {
  return {
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    role: this.role,
  };
};

userSchema.methods.toAuthJSON = function () {
  return {
    token: this.generateJWT(),
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    role: this.role,
  };
};
module.exports = mongoose.model("User", userSchema);
