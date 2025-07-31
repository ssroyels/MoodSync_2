import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // ⏱ OTP expires after 2 minutes
  },
});

export default mongoose.model("OTP", otpSchema);




