import { z } from "zod";

// Base schema with common fields
const baseUserSchema = {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/\d/, "Password must include a number")
    .regex(/[\W_]/, "Password must include a special character"),
  confirmPassword: z.string(),
  accountType: z.enum(["BusinessMan", "Enterprenuer","Investor", "User"], {
    required_error: "Please select an account type",
  }),
  
  // Optional fields with defaults
 
  alternatecontact: z.string().optional().default(""),
  image: z.string().optional().default("/images/avatar.png"),
  status: z.enum(["Pending", "Approved", "Rejected"]).optional().default("Pending"),
  
  // Admin/Partner specific fields (optional by default)
 
  adharNumber: z.string().optional().default(""),
  panNumber: z.string().optional().default(""),
  address: z.string().optional().default(""),
  pincode: z.string().optional().default(""),
  yearofexperience: z.string().optional().default(""),
  bankaccountnumber: z.string().optional().default(""),
  ifsc: z.string().optional().default(""),
  bankname: z.string().optional().default(""),
  typeOfEntity: z.enum(["individual", "company", "franchise", ""]).optional().default(""),
  vehicalRegistrationNumber: z.string().optional().default(""),
  GstNo: z.string().optional().default(""),
  Area: z.string().optional().default(""),
  serviceArea: z.string().optional().default(""),
};

// Main signup schema with conditional validation
export const signupSchema = z
  .object(baseUserSchema)
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  // .refine(
  //   (data) => {
  //     if (data.accountType === "Admin") {
  //       return (
  //         data.adharNumber &&
  //         /^[0-9]{12}$/.test(data.adharNumber) &&
  //         data.panNumber &&
  //         /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber) &&
  //         data.bloodgroup &&
  //         data.yearofexperience &&
  //         /^[0-9]{1,2}$/.test(data.yearofexperience) &&
  //         data.alternatecontact &&
  //         /^[0-9]{10}$/.test(data.alternatecontact) &&
  //         data.address &&
  //         data.pincode &&
  //         /^[0-9]{6}$/.test(data.pincode) &&
  //         data.bankname &&
  //         /^[a-zA-Z\s]+$/.test(data.bankname) &&
  //         data.bankaccountnumber &&
  //         /^[0-9]{9,18}$/.test(data.bankaccountnumber) &&
  //         data.ifsc &&
  //         /^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc)
  //       );
  //     }
  //     return true;
  //   },
  //   {
  //     message: "All required fields must be filled for Admin account type",
  //     path: ["accountType"],
  //   }
  // )
  // .refine(
  //   (data) => {
  //     if (data.accountType === "Partner") {
  //       return (
  //         data.adharNumber &&
  //         /^[0-9]{12}$/.test(data.adharNumber) &&
  //         data.address &&
  //         data.pincode &&
  //         /^[0-9]{6}$/.test(data.pincode) &&
  //         data.typeOfEntity &&
  //         ["individual", "company", "franchise"].includes(data.typeOfEntity) &&
  //         data.alternatecontact &&
  //         /^[0-9]{10}$/.test(data.alternatecontact)
  //       );
  //     }
  //     return true;
  //   },
  //   {
  //     message: "All required fields must be filled for Partner account type",
  //     path: ["accountType"],
  //   }
  // )
  // .refine(
  //   (data) => {
  //     if (data.accountType === "User" && data.vehicalRegistrationNumber) {
  //       return /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/.test(data.vehicalRegistrationNumber);
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Invalid vehicle registration number format",
  //     path: ["vehicalRegistrationNumber"],
  //   }
  // );

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Update user schema (for profile updates)
export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits").optional(),
  emergencyContact: z.string().regex(/^[0-9]{10}$/, "Emergency contact must be exactly 10 digits").optional(),
  alternatecontact: z.string().regex(/^[0-9]{10}$/, "Alternate contact must be exactly 10 digits").optional(),
  image: z.string().optional(),
  bloodgroup: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits").optional(),
  yearofexperience: z.string().regex(/^[0-9]{1,2}$/, "Years of experience must be 1-2 digits").optional(),
  bankaccountnumber: z.string().regex(/^[0-9]{9,18}$/, "Bank account number must be 9-18 digits").optional(),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format").optional(),
  bankname: z.string().regex(/^[a-zA-Z\s]+$/, "Bank name should contain only letters and spaces").optional(),
  typeOfEntity: z.enum(["individual", "company", "franchise", ""]).optional(),
  vehicalRegistrationNumber: z.string().optional(),
  GstNo: z.string().optional(),
  Area: z.string().optional(),
  serviceArea: z.string().optional(),
  adharNumber: z.string().regex(/^[0-9]{12}$/, "Invalid Aadhar number format").optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format").optional(),
  accountType: z.enum(["Admin", "Partner", "User"]).optional(),
  vehicalRegistrationNumber: z.string().regex(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/, "Invalid vehicle registration format").optional(),
});
