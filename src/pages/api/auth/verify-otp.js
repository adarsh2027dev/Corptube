// /api/auth/verify-otp.js
import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import Otp from '../../../models/Otp';
import users from '../../../models/users';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, otp, fullName, password, accountType, firstName } = req.body;

  // Validate required fields
  if (!email || !otp || !fullName || !password || !accountType || !firstName) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Find OTP document
  const otpDoc = await Otp.findOne({ email, code: otp });
  if (!otpDoc || otpDoc.expiresAt < new Date()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  // Check if email already exists
  if (await users.findOne({ email })) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate userId
  const count = await users.countDocuments({ accountType });
  const nextNumber = (count + 1).toString().padStart(3, '0');

  let userId;
  switch (accountType) {
    case 'BusinessMan':
      userId = `BusinessMan-${firstName}-${nextNumber}`;
      break;
    case 'Enterprenuer':
      userId = `Enterprenuer-${firstName}-${nextNumber}`;
      break;
    case 'Investor':
      userId = `Investor-${firstName}-${nextNumber}`;
      break;
    default:
      userId = `user-${firstName}-${nextNumber}`;
  }

  // Create user
  const newUser = await users.create({
    fullName,
    email,
    password: hashedPassword,
    accountType,
    userId,
    firstName,
  });

  // Delete OTP after success
  await Otp.deleteMany({ email });

  return res.status(200).json({
    success: true,
    message: 'Account created successfully',
    data: {
      userId: newUser.userId,
      email: newUser.email,
      fullName: newUser.fullName,
      accountType: newUser.accountType,
    },
  });
}
