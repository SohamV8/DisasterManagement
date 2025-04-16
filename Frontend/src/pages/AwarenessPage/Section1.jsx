import React, { useState, useEffect } from "react";
import {
  FaMountain,
  FaWind,
  FaFire,
  FaWater,
  FaCloud,
  FaThermometerHalf,
  FaSnowflake,
  FaBolt,
  FaCloudRain,
  FaSkull,
  FaShieldAlt,
  FaBox,
  FaBatteryFull,
  FaFirstAid,
  FaBroadcastTower,
  FaBreadSlice,
  FaTint,
  FaHome,
  FaCalendarAlt,
  FaCampground,
  FaHeartbeat,
  FaPhoneAlt,
  FaYoutube,
  FaSearch,
  FaChevronDown,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const DisasterGuide = ({
  icon: Icon,
  title,
  description,
  guidelines,
  beforeDisaster,
  duringDisaster,
  afterDisaster,
  videoLink,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-blue-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaShieldAlt className="text-green-600" />
          Key Prevention Guidelines:
        </h4>
        <ul className="space-y-2">
          {guidelines.map((guideline, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="rounded-full bg-green-100 p-1 mt-1 flex-shrink-0">
                <FaInfoCircle className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-gray-700">{guideline}</span>
            </li>
          ))}
        </ul>
      </div>

      {expanded ? (
        <div className="space-y-5 mt-6 pt-4 border-t border-gray-100 animate-fadeIn">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-600" /> Before {title}:
            </h4>
            <ul className="space-y-1">
              {beforeDisaster.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-blue-600 font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
              <FaExclamationCircle className="text-red-600" /> During {title}:
            </h4>
            <ul className="space-y-1">
              {duringDisaster.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-red-600 font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <FaHome className="text-green-600" /> After {title}:
            </h4>
            <ul className="space-y-1">
              {afterDisaster.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-green-600 font-bold">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg w-full justify-center transition-colors"
          >
            <FaYoutube className="h-5 w-5" />
            Watch {title} Safety Video
          </a>
        </div>
      ) : null}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        {expanded ? "Show Less" : "Show More"}
        <FaChevronDown
          className={`transform transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

const EmergencyKit = () => (
  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mt-8 shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-white rounded-full shadow-sm">
        <FaBox className="h-6 w-6 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Emergency Kit Essentials
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { icon: FaBatteryFull, item: "Flashlights and extra batteries" },
        { icon: FaFirstAid, item: "First aid kit and medications" },
        { icon: FaBroadcastTower, item: "Battery-powered or hand-crank radio" },
        { icon: FaBreadSlice, item: "3-day supply of non-perishable food" },
        { icon: FaTint, item: "1 gallon of water per person per day" },
        { icon: FaHome, item: "Important documents in waterproof container" },
        { icon: FaCalendarAlt, item: "Change of clothes and sturdy shoes" },
        { icon: FaCampground, item: "Emergency shelter supplies" },
        { icon: FaHeartbeat, item: "Prescription medications" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow"
        >
          <div className="p-2 bg-blue-100 rounded-full">
            <item.icon className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-gray-700">{item.item}</span>
        </div>
      ))}
    </div>
  </div>
);

const EmergencyContacts = () => (
  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mt-8 shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-white rounded-full shadow-sm">
        <FaPhoneAlt className="h-6 w-6 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Emergency Contacts</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          number: "112/108",
          service: "Emergency Disaster Management Helpline (NDRF)",
        },
        {
          number: "+91-11-26701728",
          service: "National Disaster Management Authority (NDMA)",
        },
        {
          number: "+91-11-24619943",
          service: "Indian Meteorological Department (Alerts)",
        },
        { number: "1070", service: "Flood Control Helpline" },
        { number: "24619943", service: "Indian Seismology Division (IMD)" },
        { number: "24652484", service: "IMD Cyclone Warning" },
      ].map((contact, index) => (
        <div
          key={index}
          className="flex flex-col bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow"
        >
          <span className="text-gray-700 text-sm mb-1">{contact.service}</span>
          <span className="font-bold text-red-600 text-lg">
            {contact.number}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <p className="text-gray-700 flex items-center gap-2">
        <FaInfoCircle className="text-red-600" />
        <span>
          Save these emergency numbers in your phone contacts for quick access
          during disasters.
        </span>
      </p>
    </div>
  </div>
);

const YouTubeResources = () => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mt-8 shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-white rounded-full shadow-sm">
        <FaYoutube className="h-6 w-6 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Educational Videos</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        {
          title: "Earthquake Safety Guidelines",
          url: "https://youtu.be/BLEPakj1YTY?si=-vevw6wmRklkQ2nM",
          icon: FaMountain,
        },
        {
          title: "Flood Preparedness Tips",
          url: "https://youtu.be/43M5mZuzHF8?si=zvew-fl9Mb8WaZI4",
          icon: FaCloudRain,
        },
        {
          title: "Hurricane Evacuation Plan",
          url: "https://youtu.be/xHRbnuB9F1I?si=QKQs88GuO8UHQlSn",
          icon: FaWind,
        },
        {
          title: "Wildfire Defense Strategies",
          url: "https://youtu.be/_bNLtjHG9dM?si=TDA9BYb6a-bIjCQ5",
          icon: FaFire,
        },
        {
          title: "Tsunami Warning Signs",
          url: "https://youtu.be/1ebYnhFckQk?si=d1cOVsIRB6LkVelv",
          icon: FaWater,
        },
        {
          title: "Tornado Shelter Planning",
          url: "https://youtu.be/_5TiTfuvotc?si=4lr0c_bj6iqOzAld",
          icon: FaCloud,
        },
      ].map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-red-50 transition-all"
        >
          <div className="p-2 bg-red-100 rounded-full">
            <link.icon className="h-4 w-4 text-red-600" />
          </div>
          <span className="text-gray-700 hover:text-red-700 transition-colors">
            {link.title}
          </span>
        </a>
      ))}
    </div>
  </div>
);



const LocationSelector = ({ onChange, onSearch }) => {
  const regions = [
    "All Regions",
    "Coastal Areas",
    "Mountain Regions",
    "Plains",
    "Urban Areas",
    "Forest Regions",
  ];

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-600" />
          <span className="font-medium text-gray-700">Filter by Region:</span>
        </div>
        <select
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>

        <div className="flex-grow"></div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search disasters..."
            onChange={(e) => onSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

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

const AwarenessPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const disasterGuides = [
    {
      icon: FaMountain,
      title: "Volcanoes",
      description:
        "Volcanic eruptions can release lava, gases, rocks, and ash into the surrounding area, causing widespread destruction.",
      guidelines: [
        "Know your area's volcanic risk level",
        "Prepare an emergency evacuation plan",
        "Keep goggles and masks ready for ash",
        "Monitor volcanic activity alerts",
      ],
      beforeDisaster: [
        "Develop an evacuation plan and practice it",
        "Prepare emergency supplies including masks",
        "Keep vehicles fueled and ready",
        "Learn about community warning systems",
      ],
      duringDisaster: [
        "Follow evacuation orders immediately",
        "Avoid low-lying areas and valleys",
        "Protect yourself from ash fall",
        "Stay indoors if possible",
      ],
      afterDisaster: [
        "Stay away until authorities say it's safe",
        "Clear heavy ash from roofs",
        "Avoid driving in heavy ash",
        "Use masks when cleaning ash",
      ],
      videoLink: "https://www.youtube.com/watch?v=volcano-safety",
      region: "Mountain Regions",
      coordinates: { lat: 19.4326, lon: -155.2922 }, // Example coordinates for a volcano
    },
    {
      icon: FaCloudRain,
      title: "Floods",
      description:
        "Flash floods can occur within minutes of excessive rainfall, or when a dam or levee breaks.",
      guidelines: [
        "Move to higher ground immediately if flooding occurs",
        "Never drive through flooded roadways",
        "Prepare a flood evacuation plan and emergency kit",
        "Install check valves in plumbing to prevent flood water backup",
      ],
      beforeDisaster: [
        "Elevate electrical components",
        "Install sump pumps with battery backup",
        "Document your possessions",
        "Get flood insurance if in risk area",
      ],
      duringDisaster: [
        "Move to higher ground immediately",
        "Follow evacuation routes",
        "Avoid walking through flood waters",
        "Turn off utilities if instructed",
      ],
      afterDisaster: [
        "Document damage for insurance",
        "Clean and disinfect everything that got wet",
        "Watch for downed power lines",
        "Check for structural damage",
      ],
      videoLink: "https://www.youtube.com/watch?v=flood-safety-tips",
      region: "Plains",
      coordinates: { lat: 25.7617, lon: 80.1918 }, // Example coordinates for a flood-prone area
    },
    {
      icon: FaWind,
      title: "Hurricanes",
      description:
        "Hurricanes can bring heavy rains, strong winds, floods, and coastal storm surges.",
      guidelines: [
        "Board up windows and secure outdoor objects",
        "Have an evacuation plan and emergency supplies ready",
        "Stay informed about weather conditions and evacuation orders",
        "Keep important documents in a waterproof container",
      ],
      beforeDisaster: [
        "Install storm shutters",
        "Create a hurricane evacuation plan",
        "Stock up on emergency supplies",
        "Trim trees and shrubs",
      ],
      duringDisaster: [
        "Stay inside away from windows",
        "Monitor emergency broadcasts",
        "Keep emergency supplies accessible",
        "Fill bathtubs and containers with water",
      ],
      afterDisaster: [
        "Stay away from damaged areas",
        "Avoid downed power lines",
        "Document damage with photos",
        "Begin cleanup when safe",
      ],
      videoLink: "https://www.youtube.com/watch?v=hurricane-preparedness",
      region: "Coastal Areas",
      coordinates: { lat: 25.7743, lon: -80.1937 }, // Example coordinates for a hurricane-prone area
    },
    {
      icon: FaFire,
      title: "Wildfires",
      description:
        "Wildfires can spread quickly and ignite brush, trees, and homes.",
      guidelines: [
        "Create a 30-foot defensible space around your home",
        "Keep emergency supplies in your car if evacuation is necessary",
        "Follow evacuation orders immediately",
        "Have a family communication plan in place",
      ],
      beforeDisaster: [
        "Clear vegetation around home",
        "Use fire-resistant materials",
        "Create emergency evacuation plan",
        "Install smoke detectors",
      ],
      duringDisaster: [
        "Follow evacuation orders immediately",
        "Close all windows and doors",
        "Remove flammable curtains",
        "Turn on outside lights for visibility",
      ],
      afterDisaster: [
        "Wait for official clearance to return",
        "Check for hot spots",
        "Document damage for insurance",
        "Watch for flash floods",
      ],
      videoLink: "https://www.youtube.com/watch?v=wildfire-safety-guidelines",
      region: "Forest Regions",
      coordinates: { lat: 34.0522, lon: -118.2437 }, // Example coordinates for a wildfire-prone area
    },
    {
      icon: FaWater,
      title: "Tsunamis",
      description:
        "Tsunamis are series of waves caused by earthquakes or underwater landslides.",
      guidelines: [
        "Move inland and to higher ground immediately",
        "Follow evacuation routes and signs",
        "Never return to shore after first wave",
        "Wait for official all-clear before returning",
      ],
      beforeDisaster: [
        "Know evacuation routes",
        "Practice evacuation plan",
        "Prepare emergency kit",
        "Learn warning signs",
      ],
      duringDisaster: [
        "Move to high ground immediately",
        "Follow evacuation orders",
        "Stay away from coast",
        "Listen to emergency broadcasts",
      ],
      afterDisaster: [
        "Wait for official all-clear",
        "Stay away from flood waters",
        "Help injured or trapped persons",
        "Avoid damaged areas",
      ],
      videoLink: "https://www.youtube.com/watch?v=tsunami-safety-guidelines",
      region: "Coastal Areas",
      coordinates: { lat: 35.6895, lon: 139.6917 }, // Example coordinates for a tsunami-prone area
    },
    {
      icon: FaCloud,
      title: "Tornadoes",
      description:
        "Tornadoes are violently rotating columns of air that can cause devastating damage.",
      guidelines: [
        "Seek shelter in a basement or interior room",
        "Stay away from windows and outside walls",
        "Keep emergency supplies in your shelter area",
        "Monitor weather reports and warning systems",
      ],
      beforeDisaster: [
        "Identify safe room or shelter",
        "Practice tornado drills",
        "Secure outdoor objects",
        "Install tornado alerts",
      ],
      duringDisaster: [
        "Get to lowest building level",
        "Stay away from windows",
        "Protect head with arms",
        "Listen for updates",
      ],
      afterDisaster: [
        "Stay in shelter until all-clear",
        "Watch for downed power lines",
        "Help injured people",
        "Document damage",
      ],
      videoLink: "https://www.youtube.com/watch?v=tornado-safety-guide",
      region: "Plains",
      coordinates: { lat: 35.4676, lon: -97.5164 }, // Example coordinates for a tornado-prone area
    },
    {
      icon: FaThermometerHalf,
      title: "Heat Waves",
      description:
        "Extended periods of extreme heat can cause severe health issues and infrastructure strain.",
      guidelines: [
        "Stay hydrated and avoid alcohol",
        "Stay in air-conditioned spaces",
        "Check on vulnerable neighbors",
        "Never leave children or pets in cars",
      ],
      beforeDisaster: [
        "Install window air conditioners",
        "Stock up on water",
        "Prepare cooling methods",
        "Check AC maintenance",
      ],
      duringDisaster: [
        "Stay indoors during peak heat",
        "Use cool compresses",
        "Drink plenty of fluids",
        "Minimize physical activity",
      ],
      afterDisaster: [
        "Continue hydrating",
        "Monitor for heat illness",
        "Help vulnerable people",
        "Prepare for future events",
      ],
      videoLink: "https://www.youtube.com/watch?v=heat-wave-survival-tips",
      region: "Urban Areas",
      coordinates: { lat: 28.7041, lon: 77.1025 }, // Example coordinates for an urban area
    },
    {
      icon: FaSnowflake,
      title: "Blizzards",
      description:
        "Severe winter storms with high winds, heavy snow, and dangerous wind chills.",
      guidelines: [
        "Winterize your home before the season",
        "Keep emergency heating equipment ready",
        "Stock up on winter supplies",
        "Maintain communication devices",
      ],
      beforeDisaster: [
        "Insulate pipes",
        "Service heating systems",
        "Stock winter supplies",
        "Prepare emergency kit",
      ],
      duringDisaster: [
        "Stay indoors",
        "Conserve heat",
        "Monitor carbon monoxide",
        "Keep pipes from freezing",
      ],
      afterDisaster: [
        "Clear snow safely",
        "Check for frozen pipes",
        "Help neighbors in need",
        "Restock supplies",
      ],
      videoLink: "https://www.youtube.com/watch?v=blizzard-safety-measures",
      region: "Mountain Regions",
      coordinates: { lat: 40.7128, lon: -74.006 }, // Example coordinates for a blizzard-prone area
    },
    {
      icon: FaBolt,
      title: "Severe Thunderstorms",
      description:
        "Dangerous storms with lightning, heavy rain, hail, and strong winds.",
      guidelines: [
        "Stay inside during storms",
        "Unplug electronic equipment",
        "Have backup power ready",
        "Monitor weather alerts",
      ],
      beforeDisaster: [
        "Trim dead tree branches",
        "Secure outdoor objects",
        "Install surge protectors",
        "Prepare safe room",
      ],
      duringDisaster: [
        "Stay away from windows",
        "Avoid electrical equipment",
        "Listen for warnings",
        "Be ready for power outages",
      ],
      afterDisaster: [
        "Check for damage",
        "Stay away from downed lines",
        "Report hazards",
        "Document damage",
      ],
      videoLink: "https://www.youtube.com/watch?v=thunderstorm-safety-guide",
      region: "Plains",
      coordinates: { lat: 41.8781, lon: -87.6298 }, // Example coordinates for a thunderstorm-prone area
    },
    {
      icon: FaCloudRain,
      title: "Landslides",
      description:
        "Mass movement of rock, earth, or debris down a slope that can be triggered by rain or earthquakes.",
      guidelines: [
        "Recognize warning signs like cracks",
        "Have evacuation route planned",
        "Monitor local warnings",
        "Install proper drainage",
      ],
      beforeDisaster: [
        "Assess property risk",
        "Install drainage systems",
        "Plant ground cover",
        "Learn warning signs",
      ],
      duringDisaster: [
        "Evacuate immediately",
        "Listen for unusual sounds",
        "Watch for debris flow",
        "Alert neighbors",
      ],
      afterDisaster: [
        "Stay away from slide area",
        "Check for damage",
        "Report hazards",
        "Monitor for more slides",
      ],
      videoLink: "https://www.youtube.com/watch?v=landslide-awareness-guide",
      region: "Mountain Regions",
      coordinates: { lat: 34.0522, lon: -118.2437 }, // Example coordinates for a landslide-prone area
    },
    {
      icon: FaSkull,
      title: "Pandemics",
      description:
        "Widespread occurrence of infectious diseases affecting large populations.",
      guidelines: [
        "Follow public health guidelines",
        "Practice good hygiene",
        "Keep emergency supplies ready",
        "Stay informed through official sources",
      ],
      beforeDisaster: [
        "Stock medical supplies",
        "Create family plan",
        "Maintain hygiene supplies",
        "Learn about vaccines",
      ],
      duringDisaster: [
        "Follow health guidelines",
        "Practice social distancing",
        "Wear protective equipment",
        "Monitor symptoms",
      ],
      afterDisaster: [
        "Continue precautions",
        "Get recommended vaccines",
        "Support community recovery",
        "Prepare for future waves",
      ],
      videoLink: "https://www.youtube.com/watch?v=pandemic-preparedness-guide",
      region: "Urban Areas",
      coordinates: { lat: 40.7128, lon: -74.006 }, // Example coordinates for an urban area
    },
  ];

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const filteredGuides = disasterGuides
    .filter((guide) => {
      // Filter by region
      const regionMatch =
        selectedRegion === "All Regions" || guide.region === selectedRegion;

      // Filter by search query
      const searchMatch =
        searchQuery === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase());

      return regionMatch && searchMatch;
    })
    .sort((a, b) => {
      if (userLocation) {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.coordinates.lat,
          a.coordinates.lon
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.coordinates.lat,
          b.coordinates.lon
        );
        return distanceA - distanceB;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Natural Disaster Awareness & Prevention
          </h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Being prepared for natural disasters can save lives. Learn about
            different types of disasters, prevention measures, and what to do
            before, during, and after they occur.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Alert Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <AiOutlineExclamationCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
            <p className="text-yellow-800">
              <strong>Stay Prepared:</strong> Keep emergency contacts handy and
              have an evacuation plan ready. Monitor local news and weather
              alerts for updates during emergencies.
            </p>
          </div>
        </div>

        {/* Location Filter */}
        <LocationSelector
          onChange={setSelectedRegion}
          onSearch={setSearchQuery}
        />
        {/* Disaster Guides Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          Disaster Types & Guidelines
          {selectedRegion !== "All Regions" && (
            <span className="text-blue-600 text-lg ml-2">
              ({selectedRegion})
            </span>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide, index) => (
            <DisasterGuide key={index} {...guide} />
          ))}
        </div>

        {/* Emergency Kit Section */}
        <EmergencyKit />

        {/* Emergency Contacts Section */}
        <EmergencyContacts />

        {/* YouTube Resources */}
        <YouTubeResources />
      </div>
    </div>
  );
};

export default AwarenessPage;
