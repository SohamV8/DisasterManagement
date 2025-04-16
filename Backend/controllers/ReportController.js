const Report = require("../models/Report");

const submitReport = async (req, res) => {
  const { title, location, description } = req.body;

  try {
    const newReport = new Report({
      title,
      location,
      description,
    });

    await newReport.save();
    res
      .status(201)
      .json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Error submitting report", error });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

module.exports = { submitReport, getReports };
