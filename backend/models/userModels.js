import mongoose from "mongoose";  

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  // Added fields for password recovery
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
}, { 
  minimize: false, 
  timestamps: true // Good practice to track when users are created/updated
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;