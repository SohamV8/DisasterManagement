import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [touched, setTouched] = useState({});

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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user && user.latitude && user.longitude) {
      setUserLocation({ latitude: user.latitude, longitude: user.longitude });
    }
  }, []);
  console.log(userLocation);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    setError("");

    // Create previews for the new images
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const newImages = [...images];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index].preview);

    newPreviews.splice(index, 1);
    newImages.splice(index, 1);

    setImagePreviews(newPreviews);
    setImages(newImages);
  };

  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.preview);
      });
    };
  }, [imagePreviews]);

  const validateForm = () => {
    const errors = {};
    if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    }
    if (formData.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }
    if (images.length === 0) {
      errors.images = "At least one image is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setError("Please fix the highlighted errors");
      setTouched({ title: true, description: true });
      if (errors.images) {
        setError(errors.images);
      }
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (
        typeof userLocation.latitude === "number" &&
        typeof userLocation.longitude === "number"
      ) {
        formDataToSend.append("latitude", userLocation.latitude.toString());
        formDataToSend.append("longitude", userLocation.longitude.toString());
      }

      // Append all images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch(
        "http://localhost:8000/api/reports/reports",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      console.log("Report submitted:", data);
      setFormData({ title: "", description: "" });
      setImages([]);
      setImagePreviews([]);
      setTouched({});
      toast.success("Report submitted successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errors = validateForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-700 hover:text-blue-900 flex items-center gap-1 font-medium transition-colors duration-200 group"
          disabled={isSubmitting}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-800">
              Report an Incident
            </h2>
            <p className="text-gray-600 mt-2">
              Help us respond quickly by providing detailed information
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-green-700">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={() => handleBlur("title")}
                  placeholder="E.g., Flood in Downtown Area"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200
                    ${
                      touched.title && errors.title
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }
                    ${isSubmitting ? "bg-gray-100" : "bg-white"} text-gray-800`}
                />
                {touched.title && errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={() => handleBlur("description")}
                  placeholder="Provide detailed information about the incident. What happened? When did it occur? Are there any immediate risks?"
                  disabled={isSubmitting}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200
                    ${
                      touched.description && errors.description
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }
                    ${isSubmitting ? "bg-gray-100" : "bg-white"} text-gray-800`}
                />
                {touched.description && errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Images (Max 5)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <Upload className="w-5 h-5 mx-auto" />
                        <span>Upload images</span>
                        <input
                          id="file-upload"
                          name="images"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={isSubmitting || images.length >= 5}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {errors.images && !error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.images}
                  </p>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isSubmitting}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {userLocation.latitude && userLocation.longitude ? (
                <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700">
                  Your location has been automatically detected and will be
                  included with this report.
                </div>
              ) : (
                <div className="px-4 py-3 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-700">
                  Your location could not be detected. The report will be
                  submitted without location data.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-lg font-medium
                  hover:bg-blue-700 transition-colors duration-200
                  disabled:bg-blue-400 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-4 border-blue-200 border-t-white rounded-full animate-spin"></span>
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
      </div>
    </div>
  );
};

export default Report;
