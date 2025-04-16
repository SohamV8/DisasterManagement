import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Carousel = ({ images = [], interval = 5000, customStyles = {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(handleNext, interval);
  }, [handleNext, interval]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (images.length > 1) startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide, images.length]);

  if (!images.length) return <p className="text-center text-gray-500">No images to display</p>;

  return (
    <div
      className="carousel-container"
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        ...customStyles,
      }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          display: "flex",
          transform: `translateX(-${activeIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 100%",
              position: "relative",
              height: "100%",
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(70%)",
              }}
              loading="lazy"
            />
            {/* Overlay Text */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                textAlign: "center",
                padding: "20px",
                maxWidth: "90%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                borderRadius: "12px",
              }}
            >
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
                Be Ready Before It Strikes
              </h2>
              <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
                Stay informed and equipped for any disaster. We provide real-time updates,
                safety guides, and relief resources to help communities stay safe.
              </p>
              <button
                style={{
                  padding: "10px 20px",
                  fontSize: "1rem",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => navigate("/Awareness-Page")}
              >
                Help & Awareness
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            style={arrowButtonStyle("left")}
          >
            <ArrowBackIos fontSize="small" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            style={arrowButtonStyle("right")}
          >
            <ArrowForwardIos fontSize="small" />
          </button>
        </>
      )}

      {/* Dots */}
      <div style={dotsContainerStyle}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              ...dotStyle,
              backgroundColor: activeIndex === index ? "#007BFF" : "gray",
            }}
          />
        ))}
      </div>

      {/* Responsive Styling */}
      <style>
        {`
          @media (max-width: 768px) {
            .carousel-container {
              height: 40vh !important;
            }
            .carousel-container h2 {
              font-size: 1.2rem !important;
            }
            .carousel-container p {
              font-size: 0.9rem !important;
            }
            .carousel-container button {
              font-size: 0.85rem !important;
              padding: 8px 16px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// 🧠 Extracted reusable styles for arrows and dots
const arrowButtonStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "2%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(96, 96, 96, 0.5)",
  border: "none",
  padding: "10px",
  borderRadius: "50%",
  color: "white",
  cursor: "pointer",
  zIndex: 10,
});

const dotsContainerStyle = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
};

const dotStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
};

export default Carousel;
