import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Check, ChevronLeft, Send } from "lucide-react";
import IncidentForm from '../../assets/IncidentForm.jpg';

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.latitude && user.longitude) {
      setUserLocation({ latitude: user.latitude, longitude: user.longitude });
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    }
    if (formData.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError("Please fix the highlighted errors");
      setTouched({ title: true, description: true });
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/reports/reports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, location: userLocation }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      console.log("Report submitted:", data);
      setFormData({ title: "", description: "" });
      setTouched({});
      setSuccessMessage("Report submitted successfully!");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errors = validateForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .report-container {
            font-family: 'Inter', sans-serif;
            width: 100%;
            max-width: 64rem;
            animation: fadeIn 0.5s ease-in;
          }

          .back-button:hover svg {
            transform: translateX(-4px);
          }

          .form-card {
            display: flex;
            flex-direction: row;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .form-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
          }

          .form-content {
            flex: 1;
            padding: 2rem;
            background: #ffffff;
          }

          .form-image {
            flex: 1;
            width: 100%;
            max-width: 28rem;
            height: auto;
            object-fit: cover;
          }

          .input-field,
          .textarea-field {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .input-field:focus,
          .textarea-field:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            border-color: #3b82f6;
          }

          .alert-enter {
            opacity: 0;
            transform: translateY(-10px);
          }

          .alert-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 300ms ease-in, transform 300ms ease-in;
          }

          .alert-exit {
            opacity: 1;
            transform: translateY(0);
          }

          .alert-exit-active {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 300ms ease-in, transform 300ms ease-in;
          }

          .submit-button:hover:not(:disabled) {
            transform: translateY(-1px);
            background: #1d4ed8;
          }

          .submit-button:active:not(:disabled) {
            transform: translateY(0);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            animation: spin 1s linear infinite;
          }

          @media (max-width: 1024px) {
            .form-card {
              flex-direction: column;
            }
            .form-image {
              max-width: 100%;
              height: 12rem;
            }
            .form-content {
              padding: 1.5rem;
            }
          }

          @media (max-width: 640px) {
            .form-content {
              padding: 1rem;
            }
            .form-image {
              height: 10rem;
            }
            .report-container {
              padding: 0;
            }
          }
        `}
      </style>

      <div className="report-container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
          className="back-button mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-200" />
          <span>Back</span>
        </button>

        {/* Form and Image Card */}
        <div className="form-card">
          {/* Form Content */}
          <div className="form-content">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Report an Incident
              </h2>
              <p className="mt-1 text-gray-500 text-sm">
                Provide details to help us respond quickly and effectively
              </p>
            </div>

            {/* Form Body */}
            <div>
              {/* Error Alert */}
              {error && (
                <div
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 animate-[alert-enter_300ms_ease-in]"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              )}

              {/* Success Alert */}
              {successMessage && (
                <div
                  className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3 animate-[alert-enter_300ms_ease-in]"
                  role="alert"
                  aria-live="polite"
                >
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-600 text-sm">{successMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Title Field */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Incident Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={() => handleBlur("title")}
                    placeholder="E.g., Flood in Downtown Area"
                    disabled={isSubmitting}
                    className={`input-field w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 text-sm
                      ${
                        touched.title && errors.title
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 focus:border-blue-500"
                      }
                      ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                      focus:outline-none focus:ring-0 transition-colors duration-200`}
                    aria-invalid={touched.title && errors.title ? "true" : "false"}
                    aria-describedby={touched.title && errors.title ? "title-error" : undefined}
                  />
                  {touched.title && errors.title && (
                    <p
                      id="title-error"
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur("description")}
                    placeholder="Provide detailed information about the incident. What happened? When did it occur? Are there any immediate risks?"
                    disabled={isSubmitting}
                    rows={5}
                    className={`textarea-field w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 text-sm
                      ${
                        touched.description && errors.description
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 focus:border-blue-500"
                      }
                      ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                      focus:outline-none focus:ring-0 transition-colors duration-200 resize-y`}
                    aria-invalid={touched.description && errors.description ? "true" : "false"}
                    aria-describedby={touched.description && errors.description ? "description-error" : undefined}
                  />
                  {touched.description && errors.description && (
                    <p
                      id="description-error"
                      className="mt-1 text-xs text-red-500 flex items-center gap-1"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Location Info */}
                {userLocation.latitude && userLocation.longitude ? (
                  <div
                    className="px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-600"
                    role="status"
                  >
                    Your location has been automatically detected and will be included with this report.
                  </div>
                ) : (
                  <div
                    className="px-4 py-2.5 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-600"
                    role="status"
                  >
                    Your location could not be detected. The report will be submitted without location data.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm
                    hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                    flex items-center justify-center gap-2 transition-all duration-200"
                  aria-label={isSubmitting ? "Submitting report" : "Submit report"}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner w-4 h-4 rounded-full"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Image */}
          <img
            src={IncidentForm}
            alt="Incident reporting illustration"
            className="form-image hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Report;