import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import "./Error.css";

const Error = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="error-container">
        <div className={`error-content ${isVisible ? "visible" : ""}`}>
          <h1 className="error-heading">
            4<span className="zero pulse">0</span>4
          </h1>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist
          </p>
          <div className="error-divider"></div>
          <a href="/" className="back-button">
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default Error;
