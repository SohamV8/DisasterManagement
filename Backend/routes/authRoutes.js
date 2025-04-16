const express = require("express");
const { login, updateLocation,registerVolunteer } = require("../controllers/authController"); // Ensure the path is correct

const router = express.Router();

router.post("/login", login);
router.post("/updateLocation", updateLocation);
router.post("/registerVolunteer", registerVolunteer);
module.exports = router;
