import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

dotenv.config();

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Please Enter a Valid Email",
      },
      unique: true,
    },
    borrowedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",  
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      // select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
