import dbConnect from '../../../lib/dbConnect';
import bcrypt from 'bcryptjs';
import Otp from '../../../models/Otp';
import users from '../../../models/users';
import { signupSchema } from '../../../lib/zodSchemas/userSchema';
import { serialize } from "cookie";
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { code, ...pendingSignup } = req.body;
    const parsed = signupSchema.safeParse(pendingSignup);
     if (!parsed.success) {
      return res.status(400).json({ message: "Validation error", error: parsed.error });
    }

    const { email, password,accountType,firstName } = parsed.data;

    const validOtp = await Otp.findOne({ email, code: code.toString() });

    if (!validOtp || validOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
   
    const image = "/images/avatar.png";


    let userId;

    if (accountType === "BusinessMan") {
      const adminCount = await users.countDocuments({ accountType: "BusinessMan" });
      const nextNumber = (adminCount + 1).toString().padStart(3, '0'); // e.g., '001', '002'
      userId = `BusinessMan-${firstName}-${nextNumber}`;
    } else if (accountType === "Enterprenuer") {
      const partnerCount = await users.countDocuments({ accountType: "Enterprenuer" });
      const nextNumber = (partnerCount + 1).toString().padStart(3, '0'); // e.g., '001', '002'
      userId = `Enterprenuer-${firstName}-${nextNumber}`;
    } else if (accountType === "User") {
      const userCount = await users.countDocuments({ accountType: "User" });
      const nextNumber = (userCount + 1).toString().padStart(6, '0');  
      userId = `user-${firstName}-${nextNumber}`;
    }



   

  const userdata=  await users.create({
      ...parsed.data,
      password: hashedPassword,
      image,
     userId: userId,
    });
    await Otp.deleteMany({ email });

     // Set cookie
    const cookie = serialize("customUser", JSON.stringify({
     userId: userdata.userId,
      email: userdata.email,
      name: userdata.firstName + " " + userdata.lastName,
      image: userdata.image || "/images/avatar.png",
      mobile: userdata.mobile,
      accountType: userdata.accountType, 
      
      alternatecontact: userdata.alternatecontact,
      address: userdata.address,
      
      status: userdata.status,
      id: userdata._id,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,  
    });
  res.setHeader("Set-Cookie", cookie);  

    return res.status(200).json({ message: "Email verified successfully" ,data:userdata});
  }

  res.status(405).end("Method Not Allowed");
}
