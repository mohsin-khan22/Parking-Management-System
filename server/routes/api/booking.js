const User = require("../../models/User");
const auth = require("../auth");
const router = require("express").Router();
const Vehicle = require("../../models/Vehicle");
const Floor = require("../../models/Floor");
const Booking = require("../../models/Booking");
router.post("/register", auth.isToken, auth.isUser, (req, res, next) => {
  try {
    console.log(req.body);
    const booking = new Booking();
    Vehicle.findOne({ number: req.body.number }, (err, vehicle) => {
      if (!err && vehicle === null) {
        res.status(400).send("You have to register your vehicle");
      } else {
        Booking.findOne({ vehicles: vehicle._id }, (err, data) => {
          if (!err && data) {
            res.send("Vehicle is Already Booked").status("422");
          } else {
            Floor.findOne({ floorNo: req.body.floorNo }, (err, result) => {
              if (!err && result) {
                booking.floorNo = req.body.floorNo;
                booking.model = req.body.model;
                booking.vehicles = vehicle._id;
                booking.owner = req.user._id;
                booking.bookedAt = new Date(Date.now());
                booking.endBooking = new Date(
                  new Date().getTime() +
                    req.body.endBooking * 24 * 60 * 60 * 1000
                );
                booking.save((err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(401).send(err);
                  } else {
                    return res.status(200).send(result);
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

router.get("/list", auth.isToken, auth.isAdmin, async (req, res) => {
  try {
    Booking.find()
      .populate("owner", "firstName")
      //.exec((err, result) => {

      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(401).send(err);
      });
    //  });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", (req, res, next) => {
  let owner = req.params.id;
  Booking.find({ owner: owner })
    .populate("owner", "firstName")
    .then((booking) => {
      return res.status(200).send(booking);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.put("/remove/:id", auth.isToken, auth.isUser, (req, res, next) => {
  //const

  Booking.findOne({ _id: req.params.id })
    .then((booking) => {
      console.log(booking);

      const startTime = booking.bookedAt;
      const endTime = booking.endBooking;
      const diffTime = Math.abs(endTime - startTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffDays);
      let fine = 0;
      const fineTime = Math.floor((Date.now() - endTime) / 60000);
      console.log(fineTime);
      if (fineTime >= diffDays) {
        fine = fineTime * 10;
      }
      const bill = ((endTime - startTime) / (1000 * 3600 * 24)) * 20;
      console.log(bill);
      Booking.updateOne(
        { _id: req.params.id },
        { $set: { isBooked: false, bill: "$" + bill, fine: "$" + fine } }
      )
        .then((data) => {
          if (!data) {
            return res
              .status(422)
              .send({ error: { message: "Please try again" } });
          }
          return res
            .status(200)
            .send({ success: true, message: "Booking removed successfully" });
        })
        .catch((e) => {
          return res.status(401).send({ error: { message: e.message } });
        });
    })
    .catch((e) => {
      return res.status(500).send({ error: { message: e.message } });
    });
});

// admin
router.delete("/delete/:id", auth.isToken, auth.isAdmin, (req, res, next) => {
  try {
    Booking.deleteOne({ _id: req.params.id })
      .then((result) => {
        return res.status(200).send("Booking deleted Suceesfully!");
      })
      .catch((err) => {
        return res.status(401).send("Vehicle cannot be deleted!");
      });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
