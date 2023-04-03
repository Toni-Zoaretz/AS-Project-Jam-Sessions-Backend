import mongoose from "mongoose";
import geocoder from "../utils/geoCoder.js";

const JamSessionSchema = mongoose.Schema({
  jamSessionName: {
    type: String,
    required: [true, "Please add the Jam Session name"],
  },
  instruments: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    zipcode: String,
    country: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Geocode & create location field
JamSessionSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in database
  this.address = undefined;

  next();
});

export default mongoose.model("JamSessions", JamSessionSchema);
