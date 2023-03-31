const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

async function seedVehicle() {
  // Seed Admin
  {
    var vehicle = new Vehicle();
    vehicle.model = "Handa";
    vehicle.color = "Black";
    vehicle.number = "okk4546";
    //vehicle.owner = user.id;
    //admin.isEmailVerified = true;

    await vehicle.save();
  }
  console.log("Default Vehicles Seeded");
}

module.exports = seedVehicle;
