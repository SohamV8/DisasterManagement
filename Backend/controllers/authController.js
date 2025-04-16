const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const {
      email,
      given_name: firstName,
      family_name: lastName,
    } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ firstName, lastName, email });
      await user.save();
    }

    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

const updateLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.latitude = latitude;
      user.longitude = longitude;
      await user.save();
      res.status(200).json({ message: "Location updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Error updating location", error });
  }
};

const registerVolunteer = async (req, res) => {
  const { userId, skills, availability, phoneNumber } = req.body;

  // Basic input validation
  if (!userId || !skills || !availability || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      user.skills = skills;
      user.availability = availability;
      user.phoneNumber = phoneNumber;
      if (!user.roles.includes("volunteer")) {
        user.roles.push("volunteer");
      }
      await user.save();
      res.status(200).json({ message: "Volunteer registered successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "Error registering volunteer", error });
  }
};

module.exports = { login, updateLocation, registerVolunteer };
