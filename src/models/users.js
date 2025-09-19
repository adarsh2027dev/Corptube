import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
