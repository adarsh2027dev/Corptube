import dbConnect from "../../../lib/dbConnect";
import users from "../../../models/users";
import Otp from "../../../models/Otp";
import { sendOTPEmail } from "../../../lib/nodemailer";
import { signupSchema } from "../../../lib/zodSchemas/userSchema";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: parsed.error.flatten(),
      });
    }

    const { fullName, userId, email, mobile, password, accountType, code } = parsed.data;

    try {
      // Step 1: If no code → send OTP
      if (!code) {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: "User already exists with this email"
          });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete any existing OTP for this email
        await Otp.deleteMany({ email });

        // Create new OTP
        await Otp.create({
          email,
          code: otpCode,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        await sendOTPEmail(email, otpCode);
        return res.status(200).json({
          success: true,
          message: "OTP sent to your email"
        });
      }

      // Step 2: If code → verify OTP
      const otpDoc = await Otp.findOne({ email, code });
      if (!otpDoc || otpDoc.expiresAt < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP"
        });
      }

      // Double check email existence
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists with this email"
        });
      }

      // ✅ Handle userId (check or generate)
      let finalUserId = userId;
      if (finalUserId) {
        const existingId = await users.findOne({ userId: finalUserId });
        if (existingId) {
          return res.status(409).json({
            success: false,
            message: "User ID already taken, choose another"
          });
        }
      } else {
        // Auto-generate from name
        let baseId = fullName.toLowerCase().replace(/\s+/g, "");
        let tempId = baseId;
        let counter = 1;

        // Ensure uniqueness
        while (await users.findOne({ userId: tempId })) {
          tempId = `${baseId}${counter++}`;
        }
        finalUserId = tempId;
      }


// Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);


      // ✅ Create user (password hashed by pre-save middleware in model)
      const newUser = await users.create({
        fullName,
        userId: finalUserId,
        email,
        mobile,
        password:hashedPassword,
        accountType: accountType || "User",
      });

      // Delete OTP after successful signup
      await Otp.deleteOne({ email, code });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: newUser._id,
          fullName: newUser.fullName,
          userId: newUser.userId,
          email: newUser.email,
          mobile: newUser.mobile,
          accountType: newUser.accountType,
        },
      });
    } catch (error) {
      console.error("Error in signup flow:", error);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method Not Allowed"
  });
}
