const bcrypt = require("bcryptjs");

// Normally you'd fetch from DB, but this is hardcoded for now
const users = [
  {
    username: "admin",
    // password: password123
    passwordHash: bcrypt.hashSync("password123", 10)
  }
];

module.exports = users;
