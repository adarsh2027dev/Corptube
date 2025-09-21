import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true }, // make sure it's unique
    password: { type: String, required: true },
    accountType: {
      type: String,
      enum: ["BusinessMan", "Entrepreneur", "Investor", "User"],
      default: "User",
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "/images/avatar.png",
    },
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);
