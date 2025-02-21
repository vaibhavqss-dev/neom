import React from "react";
import "./buttons.css";

interface ButtonsProps {
  scrollLeft?: () => void;
  scrollRight?: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ scrollLeft, scrollRight }) => {
  return (
    <div className="button-container">
      <button onClick={scrollRight} className="arrow-button right"></button>
      <button onClick={scrollLeft} className="arrow-button left"></button>
    </div>
  );
};

export default Buttons;
