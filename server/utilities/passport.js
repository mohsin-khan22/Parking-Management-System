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
        email: { $regex: new RegExp("^" + email.toLowerCase(), "i") },
      })
        .then(function (user) {
          //console.log(user);
          //console.log(password);
          console.log(!user.validPassword(password));

          if (!user.validPassword(password)) {
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
