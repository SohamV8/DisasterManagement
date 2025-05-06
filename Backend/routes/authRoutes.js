const express = require("express");
const {
  login,
  updateLocation,
  registerVolunteer,
  registerDonor,
  update,
} = require("../controllers/authController"); // Ensure the path is correct

const router = express.Router();

router.post("/login", login);
router.post("/updateLocation", updateLocation);
router.post("/update", update);
router.post("/registerVolunteer", registerVolunteer);
router.post("/registerDonor", registerDonor);
module.exports = router;
