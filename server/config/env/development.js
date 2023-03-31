"use strict";
module.exports = {
  backend: "http://localhost:8080",
  frontend: "http://localhost:4200",
  PORT: 8080,
  MONGODB_URI: "mongodb://127.0.0.1:27017/parkdb",
  secret: "secret",

  smtpAuth: {
    user: "support@ebankc.io",
    pass: "usman123Hello",
  },
  allowedOrigins: ["http://localhost:3000"],
};
