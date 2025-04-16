import React from "react";
import Carousel from "./Carousel";
import Volcano from "../../assets/volcano.webp";
import Landslide from "../../assets/landslide.webp";
import Cyclone from "../../assets/cyclone.webp";
import Pandemic from "../../assets/pandemic.webp";
import Floods from "../../assets/flood.webp";
import Wildfire from "../../assets/wildfire.webp";
import Earthquake from "../../assets/earthquake.webp";
import Blizzards from "../../assets/blizzards.webp";

function HomeCarousel() {
  const slides = [
    {
      image: Volcano,
      heading: "Volcano Eruption",
      paragraph: "Volcanic eruptions can destroy everything in their path. Stay informed, evacuate when advised, and avoid hazard zones.",
      link: "/volcano",
    },
    {
      image: Landslide,
      heading: "Landslides",
      paragraph: "Landslides are sudden and deadly. Be alert during heavy rains and in hilly areas. Always follow local warnings.",
      link: "/landslide",
    },
    {
      image: Cyclone,
      heading: "Cyclone Warnings",
      paragraph: "Cyclones bring destructive winds and floods. Prepare early, stay indoors, and stock emergency supplies.",
      link: "/cyclone",
    },
    {
      image: Pandemic,
      heading: "Pandemic Awareness",
      paragraph: "Health crises require calm and caution. Follow medical advice, wear masks, and maintain hygiene.",
      link: "/pandemic",
    },
    {
      image: Floods,
      heading: "Flood Alerts",
      paragraph: "Floods can rise quickly. Evacuate early, avoid water-logged roads, and stay connected with alerts.",
      link: "/floods",
    },
    {
      image: Wildfire,
      heading: "Wildfire Emergency",
      paragraph: "Wildfires spread fast. Protect yourself by evacuating when told and avoid smoke-heavy zones.",
      link: "/wildfire",
    },
    {
      image: Earthquake,
      heading: "Earthquake Safety",
      paragraph: "Drop, cover, and hold on. Secure heavy items and know the safe spots in your building.",
      link: "/earthquake",
    },
    {
      image: Blizzards,
      heading: "Blizzard Conditions",
      paragraph: "Stay indoors, keep warm, and avoid travel. Power outages and frostbite are real risks.",
      link: "/blizzards",
    },
  ];

  return <Carousel slides={slides} />;
}

export default HomeCarousel;
