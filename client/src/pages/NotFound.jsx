import React from "react";
import "./styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-animation">
          {/* You can replace this with an SVG or Lottie animation if desired */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="#fff0f0"
            />
            <path
              d="M9 9L15 15"
              stroke="#ff6b6b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 9L9 15"
              stroke="#ff6b6b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="notfound-home-btn">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
