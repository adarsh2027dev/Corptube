import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String,default: ""},
        userId: { type: String, required: true },
        Area: { type: String, default: "" },
       
        alternatecontact: { type: String,default: ""},
        image: { type: String, default: "/images/avatar.png" }, 
        
        password: { type: String ,default: "" },  
        accountType: {
            type: String,
            enum: ["BusinessMan", "Enterprenuer", "Investor","User"],
            required: true,
            default: "User",
          },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
       
        //  for businessman
        businesscategory:{
            enum:[]
        }
        // enterprenuer 
      
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
