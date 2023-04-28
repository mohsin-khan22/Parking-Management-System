const router = require("express").Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const Vehicle = require("../../models/Vehicle");
const auth = require("../auth");

router.post("/create", auth.isToken, auth.isUser, function (req, res) {
  try {
    Vehicle.findOne({ number: req.body.number }, (err, vehicle) => {
      if (err) {
        return res.status(422).send("Vehicle already registered");
      } else if (!vehicle) {
        var vehicle = new Vehicle();
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;
        vehicle.number = req.body.number;
        vehicle.owner = req.user.id;
        vehicle.save((err, result) => {
          if (err) {
            return res.status(401).send(err);
          } else {
            return res.status(200).send(result);
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get(
  "/getVehicles",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  auth.isToken,
  auth.isAdmin,
  (req, res) => {
    console.log(req.body);
    try {
      Vehicle.find()
        .populate("owner", "firstName")
        .then((result) => {
          return res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get("/getOne/:id", (req, res, next) => {
  Vehicle.findById(req.params.id)
    .then((vehicle) => {
      return res.status(200).send(vehicle);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.get("/:id", (req, res, next) => {
  let owner = req.params.id;
  Vehicle.find({ owner: owner })
    .populate("owner", "firstName")
    .then((vehicle) => {
      return res.status(200).send(vehicle);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.put("/update/:id", auth.isToken, auth.isUser, (req, res) => {
  let body = req.body;
  console.log(body);
  try {
    Vehicle.findOne({ _id: req.params.id }, (err, vehicle) => {
      if (err) {
        res.status(500).send("vehicle not found");
      } else {
        console.log(req.body.model);
        if (typeof req.body.model !== "undefined") {
          vehicle.model = req.body.model;
        }
        if (typeof req.body.color !== "undefined") {
          vehicle.color = req.body.color;
        }
        vehicle.save((err, result) => {
          if (err) {
            return res.status(401).send(err);
          } else {
            return res.status(200).send(result);
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).send("Vehicle cannot be updated");
  }
});
router.get("/search", async (req, res, next) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).send("Missing search query parameter");
  }

  try {
    const vehicles = await Vehicle.find({
      $or: [
        // { model: { $regex: searchQuery, $options: "i" } },
        { number: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("vehicle", "vehicle -_id")
      .select("-__v")
      .exec();
    return res.status(200).send(vehicles);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/delete/:id", auth.isToken, auth.isUser, (req, res) => {
  try {
    //let number = req.params.id;
    console.log(req.params.id);
    Vehicle.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).send("Vehicle not found");
      } else {
        return res.status(200).send(data);
      }
    });
  } catch (err) {
    return res.status(500).send("Vehicle cannot be delete");
  }
});

module.exports = router;
