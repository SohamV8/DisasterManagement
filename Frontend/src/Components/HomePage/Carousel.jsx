import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Carousel = ({ slides = [], interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(handleNext, interval);
  }, [handleNext, interval]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (slides.length > 1) startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide, slides.length]);

  if (!slides.length) return <p className="text-center text-gray-500">No slides available</p>;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        maxHeight: "720px",
        overflow: "hidden",
        background: "#111",
      }}
      onTouchStart={stopAutoSlide}
      onTouchEnd={startAutoSlide}
    >
      <style>
        {`
          .carousel-slide {
            flex: 0 0 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .carousel-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .carousel-overlay {
            position: absolute;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            text-align: center;
            max-width: 90%;
          }
          .carousel-heading {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: 700;
            margin-bottom: 8px;
          }
          .carousel-paragraph {
            font-size: clamp(0.875rem, 2vw, 1rem);
            margin-bottom: 16px;
          }
          .carousel-button {
            padding: 8px 16px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
          }
          .carousel-button:hover {
            background: #1e40af;
          }
          .carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            border: none;
            border-radius: 50%;
            padding: 10px;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
          }
          .carousel-arrow:hover {
            background: rgba(0, 0, 0, 0.8);
          }
          .carousel-dots {
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
          }
          .carousel-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            transition: background 0.3s;
          }
          .carousel-dot.active {
            background: #2563eb;
          }
          @media (max-width: 768px) {
            .carousel-overlay {
              padding: 12px 16px;
              bottom: 15%;
            }
            .carousel-heading {
              font-size: clamp(1.25rem, 2.5vw, 1.5rem);
            }
            .carousel-paragraph {
              font-size: clamp(0.75rem, 1.5vw, 0.875rem);
            }
            .carousel-button {
              padding: 6px 12px;
              font-size: 0.875rem;
            }
            .carousel-arrow {
              padding: 8px;
            }
          }
          @media (max-width: 480px) {
            .carousel-overlay {
              padding: 8px 12px;
              bottom: 10%;
            }
            .carousel-heading {
              font-size: clamp(1rem, 2vw, 1.25rem);
            }
            .carousel-paragraph {
              font-size: clamp(0.625rem, 1.2vw, 0.75rem);
            }
            .carousel-arrow {
              display: none;
            }
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
<img
  src={slide.image}
  alt={slide.heading}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    filter: "brightness(70%)",
  }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23ddd' width='800' height='600'/%3E%3Ctext fill='%23666' font-family='sans-serif' font-size='40' dy='.35em' text-anchor='middle' x='400' y='300'%3EImage not available%3C/text%3E%3C/svg%3E";
  }}
/>
            <div className="carousel-overlay">
              <h2 className="carousel-heading">{slide.heading}</h2>
              <p className="carousel-paragraph">{slide.paragraph}</p>
              <button
                className="carousel-button"
                onClick={() => navigate(slide.link)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            className="carousel-arrow"
            style={{ left: "16px" }}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <ArrowBackIos />
          </button>
          <button
            className="carousel-arrow"
            style={{ right: "16px" }}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ArrowForwardIos />
          </button>
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;