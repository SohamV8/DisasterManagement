import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/userSlice";
import {
  FaBell,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaUserEdit,
  FaClipboardList,
  FaMapPin,
  FaFlag,
  FaHandsHelping,
  FaHospital,
  FaFire,
  FaShieldAlt,
  FaMap,
} from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineDashboard, AiOutlineBook } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import { BiMap } from "react-icons/bi";

// Define menu items for non-logged in users (only resources)
const publicMenus = {
  resources: {
    title: "Resources",
    items: [
      {
        label: "Training Materials",
        icon: AiOutlineBook,
        path: "/Awareness-Page",
      },
    ],
  },
};

// Define menu items for logged in users (resources + services)
const privateMenus = {
  resources: {
    title: "Resources",
    items: [
      {
        label: "Training Materials",
        icon: AiOutlineBook,
        path: "/Awareness-Page",
      },
    ],
  },
  services: {
    title: "Services",
    items: [
      { label: "Find Shelter", icon: FaMapPin, path: "/shelters" },
      { label: "Report Incident", icon: FaFlag, path: "/Report" },
      { label: "Volunteer", icon: FaShieldAlt, path: "/VolunteerForm" },
      { label: "Medical Help", icon: FaHospital, path: "/hospitals" },
      { label: "Fire Stations", icon: FaFire, path: "/fire-stations" },
      {
        label: "RequirementForm",
        icon: FaHandsHelping,
        path: "/ResourceRequirement",
      },
    ],
  },
};

// Function to calculate the distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

// Function to get the threat level color
const getThreatLevelColor = (threatLevel) => {
  switch (threatLevel) {
    case "low":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "severe":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Use the appropriate menu based on login status
  const menus = user ? privateMenus : publicMenus;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getUserInitials = (user) => {
    if (user && user.firstName) {
      return user.lastName
        ? `${user.firstName[0]}${user.lastName[0]}`
        : `${user.firstName[0]}`;
    }
    return "";
  };

  const handleLogout = async () => {
    try {
      dispatch(setUser(null));
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      toast.success("Logged out successfully", {
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.error("Error during logout", error);
      toast.error("Logout failed", {
        autoClose: 2000,
      });
    }
  };

  const handleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        token: credential,
      });
      const loggedInUser = res.data.user;
      dispatch(setUser(res.data.user));

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", true);

      // Request location permission only if user is logged in
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await axios.post("http://localhost:8000/api/auth/updateLocation", {
            userId: loggedInUser._id,
            latitude,
            longitude,
          });

          // Update the user state with the new location
          dispatch(setUser({ ...loggedInUser, latitude, longitude }));
        });
      }

      toast.success("Logged in successfully", {
        autoClose: 1000,
        onClose: () => navigate("/home"),
      });
    } catch (error) {
      console.error("Error during login", error);
      toast.error("Login failed", {
        autoClose: 2000,
      });
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failed", error);
    toast.error("Login failed", {
      autoClose: 2000,
    });
  };

  const toggleDropdown = (menuTitle) => {
    setDropdownOpen((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [menuTitle]: !prevState[menuTitle],
    }));
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch(setUser(savedUser));
    }

    // Update date every minute
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(dateInterval);
  }, [dispatch]);

 useEffect(() => {
   const fetchData = async () => {
     try {
       // Fetch earthquake data
       const earthquakeResponse = await fetch(
         "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
       );
       const earthquakeData = await earthquakeResponse.json();

       let weatherData = null;
       // Only fetch weather if user is logged in and has location
       if (user && user.latitude && user.longitude) {
         const weatherResponse = await fetch(
           `https://api.open-meteo.com/v1/forecast?latitude=${user.latitude}&longitude=${user.longitude}&current_weather=true&warnings=true`
         );
         weatherData = await weatherResponse.json();
       }

       // Fetch reports data
       let reportsData = [];
       if (user && user.latitude && user.longitude) {
         const reportsResponse = await fetch(
           "http://localhost:8000/api/reports/reports"
         );
         reportsData = await reportsResponse.json();
       }

       // Process earthquake notifications
       const earthquakeNotifications = earthquakeData.features
         .filter((feature) => {
           if (!user || !user.latitude || !user.longitude) return true;
           const [longitude, latitude] = feature.geometry.coordinates;
           const distance = calculateDistance(
             user.latitude,
             user.longitude,
             latitude,
             longitude
           );
           return distance <= 500; // 500 km radius
         })
         .map((feature) => ({
           id: feature.id,
           text: `Earthquake: ${feature.properties.title}`,
           time: new Date(feature.properties.time).toLocaleString(),
           threatLevel: getEarthquakeThreatLevel(feature.properties.mag),
           read: false,
         }));

       // Process weather notifications
       const weatherNotifications = weatherData?.warnings
         ? weatherData.warnings.map((warning) => ({
             id: `weather-${warning.event}-${warning.start}`,
             text: `Weather Alert: ${warning.headline}`,
             time: new Date(warning.start * 1000).toLocaleString(),
             threatLevel: getWeatherThreatLevel(warning.severity),
             read: false,
           }))
         : [];

       // Add current weather condition if available
       if (weatherData?.current_weather) {
         weatherNotifications.push({
           id: `weather-current-${Date.now()}`,
           text: `Current Weather: ${weatherData.current_weather.temperature}°C, ${weatherData.current_weather.weathercode}`,
           time: new Date().toLocaleString(),
           threatLevel: "low",
           read: false,
         });
       }

       // Process report notifications
       const reportNotifications = reportsData
         .filter((report) => {
           if (!user || !user.latitude || !user.longitude) return false;
           const distance = calculateDistance(
             user.latitude,
             user.longitude,
             report.location.latitude,
             report.location.longitude
           );
           return distance <= 50; // 50 km radius
         })
         .map((report) => ({
           id: `report-${report.id}`,
           text: `Report: ${report.title}`,
           time: new Date(report.createdAt).toLocaleString(), // Use createdAt field
           threatLevel: "high", // Assuming high threat level for reports
           read: false,
         }));

       setNotifications([
         ...earthquakeNotifications,
         ...weatherNotifications,
         ...reportNotifications,
       ]);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   fetchData();
 }, [user]);


  const getEarthquakeThreatLevel = (magnitude) => {
    if (magnitude >= 6.0) return "severe";
    if (magnitude >= 4.5) return "high";
    if (magnitude >= 3.0) return "moderate";
    return "low";
  };

  const getWeatherThreatLevel = (severity) => {
    if (severity >= 4) return "severe";
    if (severity >= 3) return "high";
    if (severity >= 2) return "moderate";
    return "low";
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (Object.values(dropdownOpen).some((isOpen) => isOpen)) {
        if (!event.target.closest(".dropdown-container")) {
          setDropdownOpen({});
        }
      }
      if (
        isNotificationOpen &&
        !event.target.closest(".notification-container")
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, isNotificationOpen]);

  // Format date to show day, date and time
  const formattedDate = currentDate.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <GoogleOAuthProvider clientId="860312032073-8mfimrab6r5t9e09hj8ibl0n498tmf9g.apps.googleusercontent.com">
        <nav className="py-3 px-4 md:px-6 shadow-md bg-white text-gray-800 border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <NavLink to="/home" className="flex items-center mr-2">
                <span className="text-xl md:text-2xl font-bold text-blue-700 tracking-tight">
                  Disaster Management
                </span>
              </NavLink>

              <button
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Open menu"
              >
                <FaBars className="text-xl" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 lg:space-x-4">
              {Object.values(menus).map((menu) => (
                <div key={menu.title} className="relative dropdown-container">
                  <button
                    className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium flex items-center"
                    onClick={() => toggleDropdown(menu.title)}
                    aria-expanded={dropdownOpen[menu.title]}
                    aria-haspopup="true"
                  >
                    {menu.title}
                    <FaChevronDown
                      className={`ml-1 text-xs transition-transform duration-200 ${
                        dropdownOpen[menu.title] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen[menu.title] && (
                    <div className="absolute left-0 mt-1 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      {menu.items.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 ${
                              isActive ? "bg-blue-50 text-blue-700" : ""
                            }`
                          }
                          onClick={() => setDropdownOpen({})}
                        >
                          <item.icon className="mr-2 text-blue-600" />
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <NavLink
                to="/live-map"
                className={({ isActive }) =>
                  `px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium flex items-center ${
                    isActive ? "bg-blue-50 text-blue-700" : ""
                  }`
                }
              >
                <BiMap className="mr-1" />
                Live Map
              </NavLink>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Search
              </button>
            </form>

            {/* User section */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative notification-container">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={toggleNotificationDropdown}
                >
                  <FaBell className="text-xl text-gray-600" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h3 className="font-medium">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                              notification.read ? "bg-gray-50" : ""
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div
                              className={`text-xs px-2 py-1 rounded-full inline-flex items-center mb-1 ${getThreatLevelColor(
                                notification.threatLevel
                              )}`}
                            >
                              {notification.threatLevel.toUpperCase()}
                            </div>
                            <p className="text-sm">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative dropdown-container">
                  <button
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100"
                    onClick={() => toggleDropdown("userMenu")}
                    aria-expanded={dropdownOpen.userMenu}
                    aria-haspopup="true"
                  >
                    <div className="user-initials bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-medium">
                      {getUserInitials(user)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                      {user.firstName} {user.lastName || ""}
                    </span>
                    <FaChevronDown
                      className={`text-xs text-gray-500 hidden md:block transition-transform duration-200 ${
                        dropdownOpen.userMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen.userMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName || ""}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || ""}
                        </p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2 text-gray-600" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    className="google-login-button"
                    width={100}
                    text="signin_with"
                    shape="rectangular"
                    size="medium"
                  />
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          style={{ display: isSidebarOpen ? "block" : "none" }}
          onClick={toggleSidebar}
        ></div>

        <div
          className={`fixed inset-y-0 left-0 w-72 max-w-sm transform transition-transform duration-300 ease-in-out z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white text-gray-800 shadow-xl md:hidden overflow-y-auto`}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-blue-700">
                Disaster Management
              </span>
              <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="text-sm text-gray-600 mb-4">{formattedDate}</div>

            {user && (
              <div className="flex items-center p-3 mb-6 bg-gray-50 rounded-lg">
                <div className="user-initials bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-medium mr-3">
                  {getUserInitials(user)}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-500">{user.email || ""}</p>
                </div>
              </div>
            )}

            {/* Search Bar for Mobile */}
            <form
              onSubmit={handleSearch}
              className="mb-4 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Search
              </button>
            </form>

            <NavLink
              to="/live-map"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md mb-1 ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              onClick={toggleSidebar}
            >
              <BiMap className="mr-3 text-lg" />
              Live Map
            </NavLink>

            {/* Show Resources and Services based on login status */}
            {Object.values(menus).map((menu) => (
              <div key={menu.title} className="mt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-4 mb-2">
                  {menu.title}
                </h2>
                {menu.items.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-md mb-1 ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <item.icon className="mr-3 text-lg" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}

            {user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    toggleSidebar();
                    handleLogout();
                  }}
                  className="flex items-center w-full text-left px-4 py-3 rounded-md mb-1 text-gray-700 hover:bg-gray-50"
                >
                  <FaSignOutAlt className="mr-3 text-lg" />
                  Logout
                </button>
              </div>
            )}

            {!user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="px-4 py-3">
                  <p className="text-sm mb-3">Log in to access all features:</p>
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={(response) => {
                        handleLoginSuccess(response);
                        toggleSidebar();
                      }}
                      onError={handleLoginFailure}
                      width={220}
                      text="signin_with"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
