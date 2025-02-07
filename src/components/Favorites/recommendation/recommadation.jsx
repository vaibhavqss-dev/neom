import React from "react";
import "./recommadation.css";
import smileGreenFace from "./../../../assets/smileGreenFace.svg";

export default function Recommadation({ imgURL }) {
  return (
    <div className="recommadation_container">
      <div className="recommadation_img_container">
        <img id="recommadation_img" src={imgURL} alt="underwater" />
        <div className="recommadation_text"></div>
      </div>

      <div className="recommadation_container_text_overlay">
        <div className="recommadation_container_text_overlay_left">
          <p className="recommadation_img_title">Explore Underwater</p>
          <p className="recommadation_img_type">From Nov 17 to 22, 2025</p>
          <p className="recommadation_img_time">From 10:00 AM - 7:00 PM</p>
        </div>

        <div className="recommadation_container_text_overlay_right">
          <img id="recommadation_container_text_overlay_right_smileface" src={smileGreenFace} alt="smile" />
          <p className="recommadation_container_text_overlay_right_text">overwhelm</p>
        </div>
      </div>
    </div>
  );
}
