const express = require("express");
const { submitReport, getReports } = require("../controllers/ReportController"); // Ensure the path is correct
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/reports", upload.array("images"), submitReport);
router.get("/reports", getReports);

module.exports = router;
