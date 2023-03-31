const User = require("../models/User");

async function seedUser() {
  // Seed Admin
  {
    let user = new User();
    user.role = 1;
    user.email = "admin@gmail.com";
    user.firstName = "Ali";
    user.firstName = "Khan";
    user.setPassword("T3st1ng123!");
    //admin.isEmailVerified = true;

    await user.save();
  }
  //seed User
  {
    let user = new User();
    user.role = 0;
    user.email = "saad@gmail.com";
    user.firstName = "Saad";
    user.firstName = "Khan";
    user.setPassword("saad123");
    //admin.isEmailVerified = true;

    await user.save();
  }
  console.log("Default Users Seeded");
}

module.exports = seedUser;
