const Report = require("../models/Report");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const submitReport = async (req, res) => {
  const { title, description, latitude, longitude } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "reports",
      });
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path); // delete file from server after upload
    }

    const newReport = new Report({
      title,
      description,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      images: imageUrls,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({
      message: "Error submitting report",
      error: error.message,
    });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

module.exports = { submitReport, getReports };
