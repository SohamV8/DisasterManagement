import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapPin,
  FaFire,
  FaHospital,
  FaMap,
  FaShieldAlt,
  FaPhone,
} from "react-icons/fa";

const Section1 = ({ darkMode }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        );
        const data = await response.json();

        if (data.features) {
          const newNotifications = data.features.map((quake, index) => ({
            id: index + 1,
            text: `Earthquake: ${quake.properties.place} (M${quake.properties.mag})`,
            time: new Date(quake.properties.time).toLocaleTimeString(),
            type: "earthquake",
            colorClass: index % 2 === 0 ? "bg-blue-100" : "bg-white-500", // Alternating colors
          }));

          setNotifications(newNotifications);
        }
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
        setError("Failed to fetch earthquake data");
      }
    };

    fetchEarthquakeData();
  }, []);

  const emergencyServices = [
    {
      title: "Emergency Shelters",
      icon: FaMapPin,
      colorClass: "text-emerald-600",
      bgColorClass: "bg-emerald-50",
      borderColorClass: "border-emerald-200",
      tips: [
        "Provide safe refuge during disasters",
        "24/7 security and basic amenities",
        "Multiple locations across city",
      ],
      emergencyContact: "Shelter Helpline: 108",
    },
    {
      title: "Fire Stations",
      icon: FaFire,
      colorClass: "text-red-600",
      bgColorClass: "bg-red-50",
      borderColorClass: "border-red-200",
      tips: [
        "Fire prevention guidelines",
        "Regular safety drills",
        "Rapid emergency response",
      ],
      emergencyContact: "Fire Emergency: 101",
    },
    {
      title: "Hospitals",
      icon: FaHospital,
      colorClass: "text-blue-600",
      bgColorClass: "bg-blue-50",
      borderColorClass: "border-blue-200",
      tips: [
        "24/7 emergency medical services",
        "Comprehensive trauma care",
        "Advanced medical equipment",
      ],
      emergencyContact: "Medical Emergency: 102",
    },
    {
      title: "Map Views",
      icon: FaMap,
      colorClass: "text-purple-600",
      bgColorClass: "bg-purple-50",
      borderColorClass: "border-purple-200",
      tips: [
        "Real-time disaster tracking",
        "Evacuation route planning",
        "Emergency zone identification",
      ],
      emergencyContact: "Emergency Coordination: 1070",
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Disaster Alert Slide */}
      <div className="relative overflow-hidden h-8 mb-6">
        <div className="absolute flex whitespace-nowrap animate-marquee">
          {notifications.map((notification) => (
            <span
              key={notification.id}
              className={`inline-block px-4 py-1 ${notification.colorClass} shadow-md rounded-full mx-2`}
            >
              {notification.text}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Emergency Response & Resource Management
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Locate the nearest emergency shelters, fire stations, hospitals, and
            plan evacuation routes.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {emergencyServices.map((service, index) => (
            <Link
              key={index}
              to={
                service.title === "Map Views"
                  ? "http://localhost:8501/"
                  : service.title === "Emergency Shelters"
                  ? "http://localhost:8502/"
                  : `/${service.title.toLowerCase().replace(/\s+/g, "-")}`
              }
              className={`${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col`}
            >
              <div className={`${service.bgColorClass} p-6`}>
                <div className="flex items-center">
                  <service.icon className={`h-10 w-10 ${service.colorClass}`} />
                  <h2 className="text-xl font-semibold ml-3">
                    {service.title}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {service.tips[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Detailed Service Information */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Emergency Services Prevention Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={index}
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl shadow-lg overflow-hidden border ${
                    service.borderColorClass
                  } dark:border-gray-700`}
                >
                  {/* Card Header */}
                  <div
                    className={`${service.bgColorClass} p-5 border-b ${service.borderColorClass}`}
                  >
                    <div className="flex items-center">
                      <ServiceIcon
                        className={`h-8 w-8 mr-3 ${service.colorClass}`}
                      />
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <ul className="space-y-3 mb-5">
                      {service.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start text-gray-600 dark:text-gray-300"
                        >
                          <FaShieldAlt className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Emergency Contact */}
                    <div
                      className={`${service.bgColorClass} p-4 rounded-lg ${
                        darkMode ? "bg-opacity-20" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <FaPhone className="h-5 w-5 mr-2 text-green-600" />
                        <span className="font-medium">
                          {service.emergencyContact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Alert Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaPhone className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-bold">Emergency?</span> Call 112
                immediately for life-threatening situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
