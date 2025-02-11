import desertcity from "../../assets/desertcity.jpg";
import underwater from "../../assets/neom-underwater.jpg";
import city from "../../assets/city.jpg";
import React, { useState, useEffect } from "react";
import RecommendationCard from "../base/recommendationCards/recommendationCard";

const calculateTimeLeft = () => {
  const now = new Date();
  const eventTime = new Date();
  eventTime.setHours(18, 15, 0, 0);
  if (eventTime < now) {
    eventTime.setDate(eventTime.getDate() + 1);
  }
  const diff = eventTime - now;
  let timeLeft = {};
  if (diff > 0) {
    timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return timeLeft;
};

export default function CancelRecommendation() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCircleStyle = (value, max, color = "white") => {
    const degree = (value / max) * 360;
    return {
      borderRadius: "50%",
      border: "6px solid transparent",
      borderImage: `conic-gradient(${color} ${degree}deg, rgba(255, 255, 255, 0.1) 0deg) 1`,
      borderImageSlice: 1,
    };
  };
  return (
    <div className="canceleventPg">
      <p className="canceleventPg_greet">Hey Vaibhav,</p>
      <p className="canceleventPg_description">
        We have a few similar events for you against your today's cancelled
        event "Round of Golf" because of unfavourable conditions, and one of
        them is just starting in an hour and 5 minutes drive away.
      </p>

      <div className="canceleventPg_event">
        <div className="canceleventPg_event_img">
          <img src={underwater} alt="event" />
        </div>

        {/* Overlay this over image */}
        <div className="canceleventPg_event_details">
          <p className="canceleventPg_event_details_title">Under Water</p>
          <p className="canceleventPg_event_details_location">
            Pune, Maharashtra
          </p>
          <p className="canceleventPg_event_details_time">Today, 4:00 PM</p>
          <div className="canceleventPg_event_details_countdown">
            <div
              className="canceleventPg_event_details_countdown_circle"
              style={getCircleStyle(
                timeLeft.days,
                timeLeft.days > 0 ? timeLeft.days : 1,
                "#FD9A01"
              )}
            >
              <div className="canceleventPg_event_details_countdown_circle_type">
                DAYS
              </div>
              <div className="canceleventPg_event_details_countdown_circle_value">
                {timeLeft.days}
              </div>
            </div>

            <div
              className="canceleventPg_event_details_countdown_circle"
              style={getCircleStyle(timeLeft.hours, 24, "#009AFF")}
            >
              <div className="canceleventPg_event_details_countdown_circle_type">
                HOURS
              </div>
              <div className="canceleventPg_event_details_countdown_circle_value">
                {timeLeft.hours}
              </div>
            </div>

            <div
              className="canceleventPg_event_details_countdown_circle"
              style={getCircleStyle(timeLeft.minutes, 60, "#FFDF46")}
            >
              <div className="canceleventPg_event_details_countdown_circle_type">
                MINUTES
              </div>
              <div className="canceleventPg_event_details_countdown_circle_value">
                {timeLeft.minutes}
              </div>
            </div>

            <div
              className="canceleventPg_event_details_countdown_circle"
              style={getCircleStyle(timeLeft.seconds, 60, "#FF385C")}
            >
              <div className="canceleventPg_event_details_countdown_circle_type">
                SECONDS
              </div>
              <div className="canceleventPg_event_details_countdown_circle_value">
                {timeLeft.seconds}
              </div>
            </div>
          </div>
          <div className="canceleventPg_event_details_btn">
            <button>Yes, I am in</button>
          </div>
        </div>
      </div>

      <div className="canceleventPg_similarRecommendation">
        <p className="canceleventPg_similarRecommendation_heading">
          Some Similar Recommendations for you, Vaibhav
        </p>

        <div className="canceleventPg_similarRecommendation_distance">
          <div className="canceleventPg_similarRecommendation_distance_walking">
            <button>10 mins walking</button>
            <button className="canceleventPg_similarRecommendation_distance_middleBtn   ">
              20 mins walking
            </button>
            <button>30 mins walking</button>
          </div>

          <div className="canceleventPg_similarRecommendation_distance_driving">
            <button>10 mins driving</button>
            <button className="canceleventPg_similarRecommendation_distance_middleBtn">
              20 mins driving
            </button>
            <button>30 mins driving</button>
          </div>

          <div className="canceleventPg_similarRecommendation_distance_noLimits">
            <button>No Limits</button>
          </div>
        </div>

        <RecommendationCard length={10} />
      </div>
    </div>
  );
}
