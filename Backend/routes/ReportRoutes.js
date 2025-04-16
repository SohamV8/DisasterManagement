const express = require("express");
const { submitReport,getReports } = require("../controllers/ReportController"); // Ensure the path is correct

const router = express.Router();

router.post("/reports", submitReport);
router.get("/reports", getReports);

module.exports = router;
