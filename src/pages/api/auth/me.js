import { parse } from "cookie";
import dbConnect from '../../../lib/dbConnect';
import users from '../../../models/users';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const { customUser } = parse(req.headers.cookie || "");

  if (!customUser) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }

  try {
    const parsed = JSON.parse(customUser);
    const user = await users.findById(parsed.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile retrieved",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        accountType: user.accountType,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(400).json({
      success: false,
      message: "Invalid session"
    });
  }
}
