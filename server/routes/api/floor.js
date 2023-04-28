const router = require("express").Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const Floor = require("../../models/Floor");
const Vehicle = require("../../models/Vehicle");
const auth = require("../auth");
router.get("/floorList", auth.isToken, auth.isUser, (req, res) => {
  try {
    Floor.find()

      //.populate()
      .then((result) => {
        console.log(result);
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.post("/create", auth.isToken, auth.isAdmin, (req, res) => {
  try {
    const floordetails = new Floor({
      floorNo: req.body.floorNo,
    });
    // floordetails.floorNo = req.body.floorNo;

    for (let i = 0; i < 5; i++) {
      floordetails.spots.push({ spotnumber: i });
    }
    floordetails.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err);
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
router.put("/update", auth.isToken, auth.isAdmin, (req, res) => {
  try {
    Floor.findOne({ floorNo: req.body.floorNo }, (err, data) => {
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
router.delete("/delete/:id", auth.isToken, auth.isAdmin, (req, res, next) => {
  try {
    Floor.deleteOne({ _id: req.params.id })
      .then((result) => {
        return res.status(200).send("Floor deleted Suceesfully!");
      })
      .catch((err) => {
        return res.status(401).send("Floor cannot be deleted!");
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});

/*router.get("/floorList", auth.isToken, auth.isUser, (req, res) => {
  try {
    Floor.find()
      //.populate()
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});*/
module.exports = router;
