import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Helper function to calculate distance between two coordinates in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(1); // Round to 1 decimal place
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Function to get location name from coordinates
const getLocationName = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response.data && response.data.address) {
      const address = response.data.address;
      // Try to get the most specific name available
      return (
        address.road ||
        address.neighbourhood ||
        address.suburb ||
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        address.state ||
        address.country ||
        "Unknown location"
      );
    }
    return "Unknown location";
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Unknown location";
  }
};

const SOSRequestsPage = () => {
  const navigate = useNavigate();
  const [sosRequests, setSosRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "nearest", "recent"
  const [activeTab, setActiveTab] = useState("donor"); // "donor" or "accepted"

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setUser(storedUser);

    if (storedUser.latitude && storedUser.longitude) {
      fetchSOSRequests(storedUser.latitude, storedUser.longitude);
    } else {
      toast.error("Location data not found");
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    console.log("SOS Requests State:", sosRequests);
  }, [sosRequests]);

  const fetchSOSRequests = async (latitude, longitude) => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/sos/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data && response.data.success) {
        // Filter requests to only include those within 100km
        const filteredRequests = response.data.data.filter((request) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            request.location.latitude,
            request.location.longitude
          );
          return distance <= 100;
        });

        // Add location names and distances to each request
        setLoadingLocations(true);
        const requestsWithLocationNames = await Promise.all(
          filteredRequests.map(async (request) => {
            const locationName = await getLocationName(
              request.location.latitude,
              request.location.longitude
            );
            const distance = calculateDistance(
              latitude,
              longitude,
              request.location.latitude,
              request.location.longitude
            );
            // Add timestamp for sorting by recency
            return {
              ...request,
              locationName,
              distance,
              timestamp: new Date(request.createdAt || Date.now()).getTime(),
            };
          })
        );

        setSosRequests(requestsWithLocationNames);
        setLoadingLocations(false);
      } else {
        toast.error(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error fetching SOS requests:", error);
      toast.error(
        `Error fetching SOS requests: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
      setLoadingLocations(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      // Get the current user ID from your user state
      const userId = user._id;

      const response = await axios.put(
        `http://localhost:8000/api/sos/${requestId}/accept`,
        { userId }, // Send userId in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("SOS Request Accepted!");

        // Update the local state to reflect the accepted request
        setSosRequests(
          sosRequests.map((request) => {
            if (request._id === requestId) {
              return {
                ...request,
                acceptedBy: userId,
                takeRequest: true, // Also set takeRequest to true
              };
            }
            return request;
          })
        );

        // Switch to the accepted tab
        setActiveTab("accepted");
      } else {
        toast.error(response.data?.message || "Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting SOS request:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to accept request"
      );
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/sos/decline/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("SOS Request Declined");
        setSosRequests(
          sosRequests.filter((request) => request._id !== requestId)
        );
      } else {
        toast.error(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error declining SOS request:", error);
      toast.error(
        `Error declining SOS request: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Function to filter requests based on the active tab
  const getFilteredRequests = () => {
    let filteredRequests;

    if (activeTab === "donor") {
      // Show donor requests that are not accepted
      filteredRequests = sosRequests.filter(
        (request) => request.requestType === "donor" && !request.acceptedBy
      );
    } else if (activeTab === "accepted") {
      // Show requests that:
      // 1. Have takeRequest set to true AND
      // 2. Are accepted by the current user
      filteredRequests = sosRequests.filter(
        (request) =>
          request.takeRequest === true && request.acceptedBy === user._id
      );
    } else {
      filteredRequests = [];
    }

    // Sort based on the selected filter
    if (filter === "nearest") {
      return [...filteredRequests].sort((a, b) => a.distance - b.distance);
    } else if (filter === "recent") {
      return [...filteredRequests].sort((a, b) => b.timestamp - a.timestamp);
    }

    return filteredRequests;
  };

  const filteredRequests = getFilteredRequests();

  // Function to get time since request was created
  const getTimeSince = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg">Loading SOS requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Header with navigation */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </button>

          <div className="text-gray-600">
            <span className="font-medium">{user?.name || "donor"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">SOS Requests</h1>
          <p className="text-gray-600 mt-2">
            People in your area need your help
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("donor")}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === "donor"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Donor Requests
            </button>
            <button
              onClick={() => setActiveTab("accepted")}
              className={`flex-1 py-3 font-medium text-center ${
                activeTab === "accepted"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Accepted Requests
            </button>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">
                {filteredRequests.length}{" "}
                {filteredRequests.length === 1 ? "request" : "requests"} within
                100km
              </h2>
              <div className="flex space-x-2">
                <select
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Requests</option>
                  <option value="nearest">Nearest First</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Requests */}
        {loadingLocations ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading location data...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-800 mt-4">
              No {activeTab === "donor" ? "donor" : "Accepted"} Requests
              Available
            </h3>
            <p className="text-gray-600 mt-2">
              {activeTab === "donor"
                ? "There are currently no donor requests within 100km of your location."
                : "You haven't accepted any requests yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl"
              >
                {/* Card header with status */}
                <div
                  className={`${
                    activeTab === "accepted" ? "bg-blue-600" : "bg-red-600"
                  } px-4 py-2 text-white flex justify-between items-center`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      {activeTab === "accepted" ? "ACCEPTED" : "EMERGENCY"}
                    </span>
                  </div>
                  <span className="text-sm">
                    {getTimeSince(request.timestamp)}
                  </span>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {request.issue}
                  </h3>

                  <div className="flex items-start mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mt-1 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-700 font-medium">
                        {request.locationName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {request.distance} km away
                      </p>
                    </div>
                  </div>

                  {request.description && (
                    <div className="bg-gray-50 rounded p-3 mb-4">
                      <p className="text-gray-700">{request.description}</p>
                    </div>
                  )}

                  {/* Images if available */}
                  {request.images && request.images.length > 0 && (
                    <div className="mb-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {request.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="h-20 w-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-4">
                    {activeTab === "donor" ? (
                      <>
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(request._id)}
                          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Contact
                        </button>
                        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                          Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SOSRequestsPage;
