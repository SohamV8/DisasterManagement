const mongoose = require("mongoose");

const sosRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestType: {
      type: String,
      enum: ["volunteer", "donor"],
      required: true,
    },
    takeRequest: {
      type: Boolean,
      default: false,
    },
    acceptedBy: {
      // Add this field
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    issue: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Make sure this line is present and correct
module.exports = mongoose.model("SOSRequest", sosRequestSchema);
