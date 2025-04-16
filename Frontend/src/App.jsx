import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Page Components
import Home from "./pages/HomePage/Home";
import Signin from "./pages/SigninPage/Signin";
import AwarenessPage from "./pages/AwarenessPage/AwarenessPage";
import IncidentPage from "./pages/IncidentPage/IncidentPage";
import VolunteerFormPage from "./pages/VolunteerFormPage/VolunteerFormPage";

// Disaster Pages
import Cyclone from "./pages/DisasterPage/Cyclone";
import Earthquake from "./pages/DisasterPage/Earthquake";
import Floods from "./pages/DisasterPage/Floods";
import Landslide from "./pages/DisasterPage/Landslide";
import Pandemic from "./pages/DisasterPage/Pandemic";
import Volcano from "./pages/DisasterPage/Volcano";
import Wildfire from "./pages/DisasterPage/Wildfire";
import Blizzards from "./pages/DisasterPage/Blizzards";

// Layout Components
import NavBar from "./pages/HomePage/NavBar";
import Footer from "./pages/HomePage/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("darkMode", darkMode);
    
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isLoggedIn, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if current route is the signin page
  const isSigninPage = location.pathname === "/signin";

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      {!isSigninPage && <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/home" element={<Home darkMode={darkMode} />} />
          <Route 
            path="/signin" 
            element={<Signin setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} />} 
          />
          <Route path="/Awareness-Page" element={<AwarenessPage darkMode={darkMode} />} />
          <Route path="/Report" element={<IncidentPage darkMode={darkMode} />} />
          <Route path="/VolunteerForm" element={<VolunteerFormPage darkMode={darkMode} />} />

          {/* Disaster awareness pages */}
          <Route path="/cyclone" element={<Cyclone darkMode={darkMode} />} />
          <Route path="/earthquake" element={<Earthquake darkMode={darkMode} />} />
          <Route path="/floods" element={<Floods darkMode={darkMode} />} />
          <Route path="/landslide" element={<Landslide darkMode={darkMode} />} />
          <Route path="/pandemic" element={<Pandemic darkMode={darkMode} />} />
          <Route path="/volcano" element={<Volcano darkMode={darkMode} />} />
          <Route path="/wildfire" element={<Wildfire darkMode={darkMode} />} />
          <Route path="/blizzards" element={<Blizzards darkMode={darkMode} />} />
        </Routes>
      </main>

      {!isSigninPage && <Footer darkMode={darkMode} />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;