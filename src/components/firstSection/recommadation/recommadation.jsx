import React from "react";
import "./recommadation.css"
import desertcity from "../../../assets/desertcity.jpg"
import heart from "../../../assets/heart.png"

export default function Recommadation() {
  return (
    <>
      <div className="recommationContainer">
        <div className="recommationContainer_imgContainer">
            <img id="recommationContainer_img" src={desertcity} alt="desertcity" />
            {/* <img id="recommationContainer_heartpng" src={heart} alt="heartGoesHere" /> */}
        </div>

        <div className="recommationContainer_subtext">
            <p className="recommationContainer_subtext_name">Tour on the land of desert city brother</p>
            <p className="recommationContainer_subtext_date">Nov 10 - 29</p>
        </div>

        <div className="recommationContainer_description">
            <p className="recommationContainer_description_name">Desert Walking</p>
            <p className="recommationContainer_description_time">10:30 AM - 7:30 PM</p>
        </div>
      </div>
    </>
  );
}
