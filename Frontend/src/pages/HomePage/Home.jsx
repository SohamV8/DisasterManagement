import React from "react";
import Section1 from "./Section1";
import HomeCarousel from "../../Components/HomePage/HomeCarousel";

export default function Home() {
  return (
    <div className="home-container">
      <HomeCarousel />
      <Section1 />
    </div>
  );
}