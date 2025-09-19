import { z } from "zod";

// Signup schema
export const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  accountType: z.enum(["BusinessMan", "Entrepreneur", "Investor", "User"]).optional(),
  code: z.string().optional(), // For OTP verification step
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Update user schema (all fields optional)
export const updateUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required").optional(),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(),
  email: z.string().email("Invalid email address").optional(),
  accountType: z.enum(["BusinessMan", "Entrepreneur", "Investor", "User"]).optional(),
  profilePhoto: z.string().optional(),
});
