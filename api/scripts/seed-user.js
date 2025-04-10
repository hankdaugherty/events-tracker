import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/events_tracker";

async function seed() {
  await mongoose.connect(MONGO_URI);
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  const existing = await User.findOne({ username });
  if (existing) {
    console.log("User already exists. Skipping.");
    return process.exit(0);
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({ username, passwordHash });
  await user.save();

  console.log(`✅ Seeded user "${username}"`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
