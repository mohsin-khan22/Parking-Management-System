let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
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
