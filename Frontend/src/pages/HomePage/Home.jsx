import React from "react";
import Section1 from "./Section1";
import HomeCarousel from "../../Components/HomePage/HomeCarousel";
// import NotificationsPage from "../NotificationsPage/Section1";

export default function Home({ darkMode, toggleDarkMode }) {
  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>

      <HomeCarousel />
      <Section1 darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
