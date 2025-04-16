import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisasterGuide = ({
  icon: Icon,
  title,
  description,
  guidelines,
  beforeDisaster,
  duringDisaster,
  afterDisaster,
  videoLink,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const [volunteer, setVolunteer] = useState({
    phone: "",
    skills: "",
    availability: "",
  });

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleVolunteerChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const volunteerData = {
      userId: user._id, // Assuming user._id is the user ID
      phoneNumber: volunteer.phone,
      skills: volunteer.skills,
      availability: volunteer.availability,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/registerVolunteer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(volunteerData),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error("Invalid JSON response from server");
      }

      if (response.ok) {
        toast.success("🎉 Registration Successful!", {
          position: "top-center",
        });
        setVolunteer({
          phone: "",
          skills: "",
          availability: "",
        });
      } else {
        toast.error(`❌ Error: ${data.error || "Unknown error"}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Submission Failed! Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        disabled={isSubmitting}
      >
        ← Back
      </button>

      <div className="container mx-auto p-6 flex flex-col items-center">
        <ToastContainer autoClose={3000} />
        <h2 className="text-3xl font-bold mb-6 text-blue-600">
          Volunteer Registration
        </h2>
        <div className="mb-6 p-6 border rounded-lg shadow-lg bg-white w-full max-w-md">
          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.firstName + " " + user.lastName|| ""}
                className="w-full p-3 border rounded-lg bg-gray-100"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                className="w-full p-3 border rounded-lg bg-gray-100"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={volunteer.phone}
                onChange={handleVolunteerChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="\d{10}"
                title="Phone number must be 10 digits"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Skills (e.g., First Aid, Rescue)"
                value={volunteer.skills}
                onChange={handleVolunteerChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Availability</label>
              <select
                name="availability"
                value={volunteer.availability}
                onChange={handleVolunteerChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="everyday">Everyday</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisasterGuide;
