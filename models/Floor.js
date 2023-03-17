const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const FloorSchema = new mongoose.Schema({
  floorno: {
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
    floorno: this.floorno,
    spots: {
      spotnumber: this.spotnumber,
      isfree: this.isfree,
    },
  };
};

module.exports = mongoose.model("Floor", FloorSchema);
