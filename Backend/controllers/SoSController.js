const SOSRequest = require("../models/SoS");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const mongoose = require("mongoose");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const submitSOSRequest = async (req, res) => {
  const { requestType, issue, latitude, longitude, userId } = req.body;

  // Validate required fields
  if (!requestType || !issue || !latitude || !longitude || !userId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required including userId",
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one image is required",
    });
  }

  try {
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const imageUrls = [];

    // Upload images to Cloudinary
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "sos_requests",
        });
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // Remove file from server
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        continue; // Skip failed uploads but continue with others
      }
    }

    if (imageUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload any images",
      });
    }

    // Create new SOS request
    const newSOS = new SOSRequest({
      user: userId,
      requestType,
      issue,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      images: imageUrls,
    });

    await newSOS.save();

    res.status(201).json({
      success: true,
      message: "SOS Request submitted successfully",
      data: newSOS,
    });
  } catch (error) {
    console.error("Error submitting SOS request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getSOSRequests = async (req, res) => {
  try {
    // Get only active requests (not accepted) by default
    const { showAll } = req.query;
    const filter = showAll === "true" ? {} : { takeRequest: false };

    const sosRequests = await SOSRequest.find(filter)
      .populate("user", "name phone") // Include basic user info
      .populate("acceptedBy", "name phone") // Include acceptor info
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: sosRequests.length,
      data: sosRequests,
    });
  } catch (error) {
    console.error("Error fetching SOS requests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const acceptSOSRequest = async (req, res) => {
  const { requestId } = req.params;
  const { userId } = req.body;

  // Validate input
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  if (
    !mongoose.Types.ObjectId.isValid(requestId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  try {
    // Check if request exists and isn't already accepted
    const existingRequest = await SOSRequest.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: "SOS Request not found",
      });
    }

    if (existingRequest.takeRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already accepted",
      });
    }

    // Update the request
    const updatedRequest = await SOSRequest.findByIdAndUpdate(
      requestId,
      {
        takeRequest: true,
        acceptedBy: userId,
        acceptedAt: new Date(),
      },
      { new: true }
    ).populate("acceptedBy", "name phone");

    res.status(200).json({
      success: true,
      message: "SOS Request accepted successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error accepting SOS request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const declineSOSRequest = async (req, res) => {
  const { requestId } = req.params;
  const { userId } = req.body; // Optional: track who declined

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request ID format",
    });
  }

  try {
    const request = await SOSRequest.findByIdAndDelete(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "SOS Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SOS Request declined and removed",
      data: request,
    });
  } catch (error) {
    console.error("Error declining SOS request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  submitSOSRequest,
  getSOSRequests,
  acceptSOSRequest,
  declineSOSRequest,
};
