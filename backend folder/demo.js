import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    const email = "user@example.com";
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Demo user already exists:", email);
      process.exit(0);
    }
    const hashed = await bcrypt.hash("012345", 10);
    const user = await User.create({ email, password: hashed, username: "DemoUser" });
    console.log("Created demo user:", user.email, "password: 123456");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
