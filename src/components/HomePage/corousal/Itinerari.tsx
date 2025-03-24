import calendar from "../../../assets/img/calendar.svg";
import location from "../../../assets/img/location.svg";
import category from "../../../assets/img/category.svg";
import redstars from "../../../assets/img/star.svg";
import { useNavigate } from "react-router-dom";
import React from "react";

type ItinerariProps = {
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
  subtext?: string;
  min_temprature?: number;
  max_temprature?: number;
};  

const Itinerari: React.FC<ItinerariProps> = ({
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
  min_temprature = 0,
  max_temprature = 0,
  subtext = "Overwhelming vibes are coming here",
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/event-details?eventId=${eventId}&isScheduled=1`)
      }
      className="corousalContainer"
    >
      <div className="corousalContainer_imgContainer">
        <img src={ImgUrl} alt="underwater" />
        <div className="corousalContainer_imgContainer_weather--svg">
          <div className="weather-widget">
            <div className="weather-icon">🌤️</div>
            <div className="temperature">
              <span className="current-temp">
                {((max_temprature) + min_temprature) / 2} °C
              </span>
              <div className="range">
                <span className="high-temp">{max_temprature}°</span>
                <span className="low-temp">{min_temprature}°</span>
              </div>
            </div>
          </div>
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
            <img id="smileGreenFace" src={emojiFaceImg} alt="smileGreenFace" />
            {subtext}{" "}
          </div>
          <div className="corousalContainer_notifyContainer_text2">
            {Scheduled ? "Scheduled" : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerari;
