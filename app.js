const express = require("express");
const app = express();
let PORT = 8080;
require("dotenv").config();

require("./app-config")(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Server Testing
app.get("/", (req, res) => {
  res.send("heloo");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
