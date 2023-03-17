const router = require("express").Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const Floor = require("../../models/Floor");
const Vehicle = require("../../models/Vehicle");
const auth = require("../auth");
router.post("/create", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    const floordetails = new Floor();
    floordetails.floorno = req.body.floorno;

    for (let i = 0; i < 5; i++) {
      floordetails.spots.push({ spotnumber: i });
    }
    floordetails.save((err, result) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send(result.toJSON());
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.put("/update", auth.isToken, auth.isAdmin, (req, res) => {
  try {
    Floor.findOne({ floorno: req.body.floorno }, (err, data) => {
      if (data) {
        data.spots[req.body.spotnumber].isfree = req.body.isfree;
        data.save((err, result) => {
          if (err) {
            res.status(401).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.get("/floorList", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    Floor.find()
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
