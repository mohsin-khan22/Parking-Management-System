const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
vehicleSchema.methods.toJSON = function () {
  return {
    model: this.model,
    color: this.color,
    number: this.number,
  };
};
module.exports = mongoose.model("Vehicle", vehicleSchema);
