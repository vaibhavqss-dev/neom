import React from "react";
import calendar from "../../../assets/calendar.svg";
import location from "../../../assets/location.svg";
import category from "../../../assets/category.svg";
import "./Corousal.css";
import smileGreenFace from "../../../assets/smileGreenFace.svg";
import underwaterImg from "../../../assets/neom-underwater.jpg";
import redstars from "../../../assets/star.svg"

export default function Corousal({ ImgUrl, title, description, stars, reviews, dateandTime, locationName, categoryName, Scheduled }) {

  // let stars = 
  return (
    <div className="corousalContainer">
      <div className="corousalContainer_imgContainer">
        <img src={ImgUrl} alt="underwater" />
      </div>

      <div className="corousalContainer_textContainer">
        <p className="corousalContainer_textContainer_heading">{title}</p>
        <div className="stars">
          <span><img id="redstars" src={redstars} alt="redstars" /></span>
          <span><img id="redstars" src={redstars} alt="redstars" /></span>
          <span><img id="redstars" src={redstars} alt="redstars" /></span>
          <span><img id="redstars" src={redstars} alt="redstars" /></span>
          <span><img id="redstars" src={redstars} alt="redstars" /></span>

          <div className="stars-text">{stars} ({reviews} reviews)</div>
        </div>

        <p className="corousalContainer_textContainer_description">
          {description}
        </p>

        <div className="corousalContainer_eventDetails">
          <div>
            <img src={calendar} alt="calendar" />
            {dateandTime}{" "}
          </div>
          <div>
            <img src={location} alt="location" />
            {locationName}
          </div>
          <div>
            <img src={category} alt="category" />
            {categoryName}
          </div>
        </div>

        <div className="corousalContainer_notifyContainer">
            <div className="corousalContainer_notifyContainer_text1"><img id="smileGreenFace" src={smileGreenFace} alt="smileGreenFace" />Overwhelmed vibes are coming here </div>
            <div className="corousalContainer_notifyContainer_text2">{Scheduled ? "Scheduled" : undefined}</div>
        </div>
      </div>
    </div>
  );
}
