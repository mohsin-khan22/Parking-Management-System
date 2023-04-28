const router = require("express").Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const User = require("../../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const auth = require("../auth");

/*router.get("/users", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    User.find()
      .populate()
      .exec((err, result) => {
        if (err) {
          res.status(401).send(err);
        } else if (result) {
          res.status(200).send(result);
        }
      });
  } catch (err) {
    console.log(err);
  }
});*/
router.get("/getUsers", auth.isToken, auth.isAdmin, (req, res, next) => {
  User.find({ role: 0 })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.delete("/delete/:id", auth.isToken, auth.isAdmin, (req, res) => {
  try {
    User.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).send("User not found");
      } else {
        return res.status(200).send("user Deleted");
      }
    });
  } catch (err) {
    return res.send("User cannot be deleted");
  }
});
/*router.delete("/delete/:email", auth.required, auth.admin, (req, res, next) => {
  User.deleteOne({ email: req.params.email })
    .then((deletesUser) => {
      console.log(deletesUser);

      return next(new OkResponse("User deleted"));
    })
    .catch((err) => {
      return next(
        new BadRequestResponse({
          error:
            "The Email you want to deleted is not registered in our database",
        })
      );
    });
});*/

module.exports = router;
