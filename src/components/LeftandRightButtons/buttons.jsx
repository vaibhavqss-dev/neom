import React from "react";
import "./buttons.css";

export default function Buttons({ scrollLeft, scrollRight }) {
  return (
    <div className="button-container">
      <button onClick={scrollLeft} className="arrow-button left"></button>
      <button onClick={scrollRight} className="arrow-button right"></button>
    </div>
  );
}
