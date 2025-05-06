const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  description: {
    type: String,
    required: true,
  },
  images: { type: [String], required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
