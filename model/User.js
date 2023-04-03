import mongoose from "mongoose";
import JamSession from "./JamSession.js";
import geocoder from "../utils/geoCoder.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a  full name"],
      trim: true,
      maxLength: [35, "Name can not be more than 35 characters"],
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(\+9725|\+972-5|9725|05)[-\s]?\d{8}$/.test(value);
        },
        message: "Please add a valid Israeli phone number",
      },
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email address already taken"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    jamSession_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "JamSessions",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("JamUsers", UserSchema);
