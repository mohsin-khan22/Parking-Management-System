const User = require("../../models/User");
const auth = require("../auth");
const router = require("express").Router();
const Vehicle = require("../../models/Vehicle");
const Floor = require("../../models/Floor");
const Booking = require("../../models/Booking");
router.post("/register", auth.isToken, auth.isUser, (req, res, next) => {
  try {
    const booking = new Booking();
    Vehicle.findOne({ number: req.body.number }, (err, vehicle) => {
      if (!err && vehicle === null) {
        res.send("You have to register your vehicle");
      } else {
        Booking.findOne({ vehicles: vehicle._id }, (err, data) => {
          if (!err && data) {
            res.send("Vehicle is Already Booked").status("422");
          } else {
            Floor.findOne({ floorno: req.body.floors }, (err, result) => {
              if (!err && result) {
                booking.floors = req.body.floors;
                booking.vehicles = vehicle._id;
                booking.user = req.user._id;
                booking.startTime = new Date(Date.now());
                booking.endTime = new Date();
                booking.save((err, result) => {
                  if (err) {
                    res.status(401).send(err);
                  } else {
                    res.status(200).send(result);
                  }
                });
              } else {
                res.status(404).send("Floor Not Found!");
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/rent", auth.isToken, (req, res, next) => {
  try {
    Vehicle.findOne({ number: req.body.number }, (err, data) => {
      if (err || data === null) {
        res.status(401).send("vehicle not found!");
      } else if (!err && data) {
        console.log(data._id);
        Booking.findOne({ vehicles: data._id }, (err, result) => {
          if (err || result === null) {
            res.status(401).send("No such booking exist!");
          } else if (!err && result) {
            console.log(result);
            const amount = result.calculateRent(
              result.endTime,
              result.startTime
            );
            res.status(200).json("Yours rent is " + amount + " Rs");
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/bookingList", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    Booking.find()
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
});
module.exports = router;
