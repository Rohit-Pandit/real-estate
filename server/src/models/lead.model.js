import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    interested: {
      type: String,
      default: "Yes",
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      
    },
  },
  { timestamps: true },
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
