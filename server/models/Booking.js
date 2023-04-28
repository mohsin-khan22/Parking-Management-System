const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const BookingSchema = mongoose.Schema({
  floorNo: { type: String, required: true },
  model: { type: String, required: true },
  vehicles: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isBooked: {
    type: Boolean,
    default: false,
  },
  bookedAt: {
    type: Date,
  },
  endBooking: {
    type: Date,
  },
  bill: {
    // $20/hour
    type: String,
    default: "$0",
  },
  fine: {
    // $10/ 15 mins
    type: String,
    default: "$0",
  },
  //startTime: { type: String, default: Date.now() },
  //endTime: { type: String, required: true },
});

BookingSchema.pre("find", function () {
  this.populate("vehicles");
  this.populate("user");
});

BookingSchema.methods.calculateRent = function (date1, date2) {
  console.log(date1);
  const _date1 = new Date(date1);
  const _date2 = new Date(date2);
  var totalTime = _date1 - _date2;
  console.log(totalTime);
  var totalDays = totalTime / (1000 * 3600 * 24);
  var amount = totalDays * 100;
  console.log("Yours total rent is " + amount + " Rs");
  return amount;
};

BookingSchema.methods.toJSON = function () {
  const date = new Date(this.bookedAt).toUTCString();
  return {
    id: this.id,
    owner: this.owner,
    model: this.model,
    vehicles: this.vehicles,
    fine: this.fine,
    bill: this.bill,
    // isBooked: this.isBooked,
    floorNo: this.floorNo,
    //spot: this.spot,
    bookedAt: date === "Invalid Date" ? this.bookedAt : date,
  };
};
//BookingSchema.methods.toJSON = function () {
//return {
//floors: this.floors,
//vehicles: this.vehicles,
//user: this.user,
//startTime: this.startTime,
//endTime: this.endTime,
//};
//};
//BookingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Booking", BookingSchema);
