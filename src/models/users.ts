import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: String,
    image: { type: String, default: '' },
    role: { type: String, enum: ["user", "admin", "editor","writer"], default: "user" },
    isActive: { type: Boolean, default: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    authType: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    cover: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
