const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();

const app = express();
require("./models/User");
app.use(bodyParser.json());
app.use(router);

const PORT = 3000;
mongoose
  .connect("mongodb://127.0.0.1:27017/parkdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    mongoose.set("debug", true);
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}.`);
    });
    console.log("Connected to database successfully");
  });
