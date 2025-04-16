import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/HomePage/Home";
import Signin from "./pages/SigninPage/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AwarenessPage from "./pages/AwarenessPage/AwarenessPage";
import IncidentPage from "./pages/IncidentPage/IncidentPage";
import VolunteerFormPage from "./pages/VolunteerFormPage/VolunteerFormPage";

import Cyclone from "./pages/DisasterPage/Cyclone";
import Earthquake from "./pages/DisasterPage/Earthquake";
import Floods from "./pages/DisasterPage/Floods";
import Landslide from "./pages/DisasterPage/Landslide";
import Pandemic from "./pages/DisasterPage/Pandemic";
import Volcano from "./pages/DisasterPage/Volcano";
import Wildfire from "./pages/DisasterPage/Wildfire";
import Blizzards from "./pages/DisasterPage/Blizzards";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="w-screen min-h-screen bg-white text-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Awareness-Page" element={<AwarenessPage />} />
        <Route path="/Report" element={<IncidentPage />} />
        <Route path="/VolunteerForm" element={<VolunteerFormPage />} />


 {/* Disaster awareness pages */}
        <Route path="/cyclone" element={<Cyclone />} />
        <Route path="/earthquake" element={<Earthquake />} />
        <Route path="/floods" element={<Floods />} />
        <Route path="/landslide" element={<Landslide />} />
        <Route path="/pandemic" element={<Pandemic />} />
        <Route path="/volcano" element={<Volcano />} />
        <Route path="/wildfire" element={<Wildfire />} />
        <Route path="/blizzards" element={<Blizzards />} />

      </Routes>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
