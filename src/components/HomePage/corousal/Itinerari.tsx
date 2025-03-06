import React from "react";
import calendar from "../../../assets/img/calendar.svg";
import location from "../../../assets/img/location.svg";
import category from "../../../assets/img/category.svg";
import weather from "../../../assets/img/weather.svg";
import redstars from "../../../assets/img/star.svg";
import { NavLink, useNavigate } from "react-router-dom";

function Itinerari({
  eventId,
  ImgUrl,
  title,
  description,
  stars,
  reviews,
  dateandTime,
  locationName,
  categoryName,
  Scheduled,
  emojiFaceImg,
}: {
  eventId: string | number;
  ImgUrl: string;
  title: string;
  description: string;
  stars: number;
  reviews: number;
  dateandTime: string;
  locationName: string;
  categoryName: string;
  Scheduled?: boolean;
  emojiFaceImg: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/event-details?eventId=${eventId}`)}
      className="corousalContainer"
    >
      <div className="corousalContainer_imgContainer">
        <img src={ImgUrl} alt="underwater" />
        <div className="corousalContainer_imgContainer_weather--svg">
          <img src={weather} alt="weather" />
          <p>25°C</p>
        </div>
      </div>

      <div className="corousalContainer_textContainer">
        <p className="corousalContainer_textContainer_heading">{title}</p>
        <div className="stars">
          <div className="starsIcon">
            {Array.from({ length: stars }).map((_, index) => (
              <span key={index}>
                <img id="redstars" src={redstars} alt="redstars" />
              </span>
            ))}
          </div>
          <div className="stars-text">
            {stars} ({reviews} reviews)
          </div>
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
          <div className="corousalContainer_notifyContainer_text1">
            <img
              id="smileGreenFace"
              src={emojiFaceImg}
              alt="smileGreenFace"
            />
            Overwhelmed vibes are coming here{" "}
          </div>
          <div className="corousalContainer_notifyContainer_text2">
            {Scheduled ? "Scheduled" : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerari;
