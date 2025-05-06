import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserRoles } from "../../redux/userSlice"; // Adjust the import path as needed

const DonorRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [donor, setDonor] = useState({
    phone: "",
    donationType: "",
    location: "",
  });

  useEffect(() => {
    // Fetch user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // Fetch location data from local storage
      if (storedUser.latitude && storedUser.longitude) {
        setDonor((prevDonor) => ({
          ...prevDonor,
          location: `${storedUser.latitude}, ${storedUser.longitude}`,
        }));
      } 
    }
  }, []);

  const handleDonorChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const donorData = {
      userId: user._id, // Assuming user._id is the user ID
      phoneNumber: donor.phone,
      donationType: donor.donationType,
      location: donor.location,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/registerDonor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donorData),
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

        // Update user roles in Redux store
        const updatedRoles = [...new Set([...user.roles, "donor"])];
        dispatch(updateUserRoles(updatedRoles));

        // Update user roles in local storage
        const updatedUser = { ...user, roles: updatedRoles };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        window.location.href = "/"; // Redirect to donor dashboard
        setDonor({
          phone: "",
          donationType: "",
          location: "",
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
          Donor Registration
        </h2>
        <div className="mb-6 p-6 border rounded-lg shadow-lg bg-white w-full max-w-md">
          <form onSubmit={handleDonorSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.firstName + " " + user.lastName || ""}
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
                value={donor.phone}
                onChange={handleDonorChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="\d{10}"
                title="Phone number must be 10 digits"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Donation Type</label>
              <input
                type="text"
                name="donationType"
                placeholder="Donation Type (e.g., Food, Clothes)"
                value={donor.donationType}
                onChange={handleDonorChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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

export default DonorRegistration;
