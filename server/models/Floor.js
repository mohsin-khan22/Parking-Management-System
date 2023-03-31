const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const FloorSchema = new mongoose.Schema({
  floornNo: {
    type: String,
    required: true,
    unique: true,
  },
  spots: [
    {
      spotnumber: { type: Number },
      isfree: { type: Boolean, default: true },
    },
  ],
});
FloorSchema.plugin(uniqueValidator);

FloorSchema.methods.toJSON = function () {
  return {
    floorNo: this.floorNo,
    spots: this.spots,
  };
};

module.exports = mongoose.model("Floor", FloorSchema);
