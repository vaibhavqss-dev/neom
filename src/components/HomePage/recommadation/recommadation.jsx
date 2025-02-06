import React from "react";
import "./recommadation.css";

export default function Recommadation({ imgURL, rank, name, subtext, date, time }) {
  return (
    <>
      <div className="recommationContainer">
        <div className="recommationContainer_imgContainer">
          <div className="heart">
            <svg
              className="heart-overlay"
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21s-7-4.5-10-9c-3-4.5 0-9 5-9 2.5 0 4.5 2 5 3 0.5-1 2.5-3 5-3 5 0 8 4.5 5 9-3 4.5-10 9-10 9z"
                stroke="white"
                stroke-width="2"
                fill="none"
              />
            </svg>
          </div>

          <img
            id="recommationContainer_img"
            src={imgURL}
            alt="desertcity"
          />

          <div className="number">{rank}</div>
        </div>

        <div className="recommationContainer_subtext">
          <p className="recommationContainer_subtext_name">
            {subtext ? subtext : "Just a normal day"}
          </p>

          <p className="recommationContainer_subtext_date">{date}</p>
        </div>

        <div className="recommationContainer_description">
          <p className="recommationContainer_description_name">{name}</p>
          <p className="recommationContainer_description_time">{time}</p>
        </div>
      </div>
    </>
  );
}
