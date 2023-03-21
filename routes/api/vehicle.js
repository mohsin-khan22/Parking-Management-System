const router = require("express").Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const Vehicle = require("../../models/Vehicle");
const auth = require("../auth");

router.post("/enter", auth.isToken, auth.isUser, function (req, res) {
  try {
    Vehicle.findOne({ number: req.body.number }, (err, vehicle) => {
      if (err) {
        res.send("Vehicle already registered");
      } else if (!vehicle) {
        var vehicle = new Vehicle();
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;
        vehicle.number = req.body.number;
        vehicle.owner = req.user.id;
        vehicle.save((err, result) => {
          if (err) {
            res.status(401).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.put("/update", auth.isToken, auth.isUser, (req, res) => {
  try {
    Vehicle.findOne({ number: req.body.number }, (err, vehicle) => {
      if (err) {
        res.status(500).send("vehicle not found");
      } else {
        if (typeof req.body.model !== "undefined") {
          vehicle.model = req.body.model;
        }
        if (typeof req.body.color !== "undefined") {
          vehicle.color = req.body.color;
        }
        vehicle.save((err, result) => {
          if (err) {
            res.status(401).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  } catch (err) {
    res.send("Vehicle cannot be delete");
  }
});
router.delete("/delete", auth.isToken, auth.isUser, (req, res) => {
  try {
    Vehicle.deleteOne({ number: req.body.number }, (err, data) => {
      if (err) {
        res.status(500).send("Vehicle not found");
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.send("Vehicle cannot be delete");
  }
});

module.exports = router;
