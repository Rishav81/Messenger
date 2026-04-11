import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("MongoDb connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
