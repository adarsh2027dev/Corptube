import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  code: String, //hel
  expiresAt: Date,
});

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
