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
import DonorFormPage from "./pages/DonorFormPage/DonorFormPage";
import SoSFormPage from "./pages/SoSFormPage/SoSFormPage";
import VolunteerReqPage from "./pages/VolunteerReqPage/VolunteerReqPage";
import DonorReqPage from "./pages/DonorReqPage/DonorReqPage";

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
        <Route path="/DonorForm" element={<DonorFormPage />} />
        <Route path="/SendRequest" element={<SoSFormPage />} />
        <Route path="/VolunteerRequirement" element={<VolunteerReqPage />} />
        <Route path="/DonorRequirement" element={<DonorReqPage />} />
      </Routes>
    </div>
  );
}

export default App;
