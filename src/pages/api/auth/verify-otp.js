import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import Otp from '../../../models/Otp';
import users from '../../../models/users';
import { signupSchema } from '../../../lib/zodSchemas/userSchema';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { otp, ...pendingSignup } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Validate request body against schema
    const parsed = signupSchema.safeParse(pendingSignup);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        error: parsed.error,
      });
    }

    const { email, password, accountType, firstName } = parsed.data;

    // Check OTP validity
    const validOtp = await Otp.findOne({ email, otp: otp.toString() });
    if (!validOtp || validOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate custom userId
    let userId;
    if (accountType === "BusinessMan") {
      const count = await users.countDocuments({ accountType: "BusinessMan" });
      const nextNumber = (count + 1).toString().padStart(3, '0');
      userId = `BusinessMan-${firstName}-${nextNumber}`;
    } else if (accountType === "Enterprenuer") {
      const count = await users.countDocuments({ accountType: "Enterprenuer" });
      const nextNumber = (count + 1).toString().padStart(3, '0');
      userId = `Enterprenuer-${firstName}-${nextNumber}`;
    } else {
      const count = await users.countDocuments({ accountType: "User" });
      const nextNumber = (count + 1).toString().padStart(6, '0');
      userId = `user-${firstName}-${nextNumber}`;
    }

    // Save user in DB
    const userdata = await users.create({
      ...parsed.data,
      password: hashedPassword,
      userId,
    });

    // Remove OTP after success
    await Otp.deleteMany({ email });

    return res.status(200).json({
      message: "Account created successfully",
      data: {
        userId: userdata.userId,
        email: userdata.email,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        accountType: userdata.accountType,
      },
    });
  }

  return res.status(405).end("Method Not Allowed");
}
