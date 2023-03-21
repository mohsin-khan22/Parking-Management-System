(http = require("http")), (sharp = require("sharp"));
(path = require("path")),
  (express = require("express")),
  (bodyParser = require("body-parser")),
  (session = require("express-session")),
  (cors = require("cors")),
  (passport = require("passport")),
  (errorhandler = require("errorhandler")),
  (mongoose = require("mongoose")),
  (secret = require("./config").secret),
  (createLocaleMiddleware = require("express-locale")),
  (compression = require("compression")),
  (httpResponse = require("express-http-response"));

let isProduction = process.env.NODE_ENV === "production";

const { allowedOrigins, MONGODB_URI } = require("./config");

module.exports = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );
  app.use(compression());
  // Normal express config defaults
  app.use(require("morgan")("dev"));
  app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
  app.use(bodyParser.json({ limit: "500mb" }));
  // Get the user's locale, and set a default in case there's none
  app.use(
    createLocaleMiddleware({
      priority: ["accept-language", "default"],
      default: "en_US", // ko_KR
    })
  );

  app.use(require("method-override")());
  // console.log(__dirname);
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(
    session({
      secret: secret,
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false,
    })
  );

  if (!isProduction) {
    app.use(errorhandler());
  }

  if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } else {
    mongoose
      .connect(`${MONGODB_URI}?retryWrites=false`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      })
      .then(() => {
        console.log("connected to database");
      })
      .catch((err) => {
        console.log(err);
      });

    mongoose.set("debug", true);
  }

  require("./models/User");

  require("./utilities/passport");
  app.use(passport.initialize());

  app.use(require("./routes"));

  app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use(httpResponse.Middleware);

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });
};
