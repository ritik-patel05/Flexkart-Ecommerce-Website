import Mongoose from "mongoose";

const { Schema } = Mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: function () {
        return this.userProvider === "email";
      },
    },
    userProvider: {
      type: String,
      required: true,
      default: "email",
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = Mongoose.model("User", UserSchema);

export default UserModel;
