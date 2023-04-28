const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const FloorSchema = new mongoose.Schema({
  floorNo: {
    type: Number,
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
    id: this.id,
    floorNo: this.floorNo,
    //spots: this.spots,
  };
};

module.exports = mongoose.model("Floor", FloorSchema);
