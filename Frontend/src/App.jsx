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

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Check if current route is the signin page
  const isSigninPage = location.pathname === "/signin";

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {!isSigninPage && <NavBar isLoggedIn={isLoggedIn} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route 
            path="/signin" 
            element={<Signin setIsLoggedIn={setIsLoggedIn} />} 
          />
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
      </main>

      {!isSigninPage && <Footer />}

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
        theme="light"
      />
    </div>
  );
}

export default App;