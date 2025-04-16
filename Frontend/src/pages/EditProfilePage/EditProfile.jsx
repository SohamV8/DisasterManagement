import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../../redux/userSlice";

export default function EditProfile({ darkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${user._id}`,
        formData
      );
      dispatch(setUser(res.data));
      toast.success("Profile updated successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Profile update failed", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 py-12 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .edit-profile-container {
            font-family: 'Inter', sans-serif;
            animation: fadeIn 0.5s ease-in;
          }

          .form-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .form-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .input-field {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .input-field:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .submit-button:hover:not(:disabled) {
            transform: translateY(-1px);
          }

          .submit-button:active:not(:disabled) {
            transform: translateY(0);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .toast-container {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="edit-profile-container w-full max-w-md">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          className="toast-container"
        />

        {/* Form Card */}
        <div className="form-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white tracking-tight">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 border rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                placeholder="Enter your first name"
                aria-required="true"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 border rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                placeholder="Enter your last name"
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="input-field w-full px-4 py-3 border rounded-lg text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500 cursor-not-allowed"
                aria-disabled="true"
                aria-describedby="email-note"
              />
              <p
                id="email-note"
                className="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Email cannot be changed.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
              aria-label="Save profile changes"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}