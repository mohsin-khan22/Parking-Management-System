const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const BookingSchema = mongoose.Schema({
  floors: { type: String, required: true },
  vehicles: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startTime: { type: String, default: Date.now() },
  endTime: { type: String, required: true },
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
  return {
    floors: this.floors,
    vehicles: this.vehicles,
    user: this.user,
    startTime: this.startTime,
    endTime: this.endTime,
  };
};
BookingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Booking", BookingSchema);
