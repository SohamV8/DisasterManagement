import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser, updateUserRoles } from "../../redux/userSlice";

const SOSPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sos, setSos] = useState({
    requestType: "",
    issue: "",
    latitude: "",
    longitude: "",
    images: [],
  });
  const [issueOptions, setIssueOptions] = useState([]);

  useEffect(() => {
    // Check if user exists in Redux store
    if (!user) {
      // Fallback to localStorage if Redux store is empty
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(setUser(storedUser));
      } else {
        toast.error("❌ Please login first.");
        navigate("/login");
        return;
      }
    }

    if (user?.latitude && user?.longitude) {
      setSos((prevSos) => ({
        ...prevSos,
        latitude: user.latitude,
        longitude: user.longitude,
      }));
    } else {
      toast.error("❌ Location data not found.");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (sos.requestType === "volunteer") {
      setIssueOptions(["First Aid", "Rescue", "Support"]);
    } else if (sos.requestType === "donor") {
      setIssueOptions(["Food", "Clothing", "Medical Supplies"]);
    } else {
      setIssueOptions([]);
    }
  }, [sos.requestType]);

  const handleSosChange = (e) => {
    setSos({ ...sos, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    // Update both Redux store and local state
    const updatedUser = { ...user, [e.target.name]: e.target.value };
    dispatch(setUser(updatedUser));
  };

  const handleImageChange = (e) => {
    setSos({ ...sos, images: e.target.files });
  };

  const handleSosSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("❌ User not authenticated. Please login again.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("requestType", sos.requestType);
    formData.append("issue", sos.issue);
    formData.append("latitude", sos.latitude);
    formData.append("longitude", sos.longitude);
    formData.append("userId", user._id); // Add user ID to the form data

    // Append each image file
    for (let i = 0; i < sos.images.length; i++) {
      formData.append("images", sos.images[i]);
    }

    try {
      // Update user role first
      const updateResponse = await axios.post(
        "http://localhost:8000/api/auth/update",
        {
          userId: user._id,
          role: "victim",
          phone: user.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update Redux store with new roles
      const newRoles = [...(user.roles || []), "victim"];
      dispatch(updateUserRoles(newRoles));

      // Then submit SOS request
      const response = await axios.post(
        "http://localhost:8000/api/sos/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("🎉 SOS Request Submitted Successfully!");
        setSos({
          requestType: "",
          issue: "",
          latitude: "",
          longitude: "",
          images: [],
        });

        // Update local storage
        const updatedUser = {
          ...user,
          roles: newRoles,
          phone: user.phone,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        toast.error(`❌ Error: ${response.data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        `❌ Submission Failed! ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={5000} />
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        disabled={isSubmitting}
      >
        ← Back
      </button>

      <div className="container mx-auto p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">SOS Request</h2>
        <div className="mb-6 p-6 border rounded-lg shadow-lg bg-white w-full max-w-md">
          <form onSubmit={handleSosSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700">Full Name</label>
              <input
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                className="w-full p-3 border rounded-lg bg-gray-100"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full p-3 border rounded-lg bg-gray-100"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={user.phone || ""}
                onChange={handleUserChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Request Type</label>
              <select
                name="requestType"
                value={sos.requestType}
                onChange={handleSosChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Request Type</option>
                <option value="volunteer">Volunteer</option>
                <option value="donor">Donor</option>
              </select>
            </div>
            {sos.requestType && (
              <div className="flex flex-col">
                <label className="text-gray-700">Issue</label>
                <select
                  name="issue"
                  value={sos.issue}
                  onChange={handleSosChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Issue</option>
                  {issueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-gray-700">Images</label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                multiple
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
