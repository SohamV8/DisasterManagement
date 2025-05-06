const express = require("express");
const router = express.Router();
const {
  submitSOSRequest,
  getSOSRequests,
  acceptSOSRequest,
  declineSOSRequest,
} = require("../controllers/SoSController");
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 3, // Maximum 3 images per request
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// SOS Request Routes
router.post("/", upload.array("images", 3), submitSOSRequest);
router.get("/", getSOSRequests);
router.put("/:requestId/accept", acceptSOSRequest); // Changed to PUT for semantic correctness
router.put("/:requestId/decline", declineSOSRequest); // Changed to DELETE

module.exports = router;
