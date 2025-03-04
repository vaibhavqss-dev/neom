import React from "react";
import { TimeLeft } from "../hooks/useCountdownTimer";
import CountdownTimer from "./CountdownTimer";
import { NavLink } from "react-router-dom";

type EventDetailsProps = {
  eventName: string;
  eventLocation: string;
  eventStartIn: string;
  timeLeft: TimeLeft;
  imageUrl: string;
  redirectUrl: string;
};

const EventDetails: React.FC<EventDetailsProps> = ({
  eventName,
  eventLocation,
  eventStartIn,
  timeLeft,
  imageUrl,
  redirectUrl = "/",
}) => {
  return (
    <div className="events_main">
      <div className="events_img">
        <img src={imageUrl} alt={eventName} />
      </div>

      <div className="events_details">
        <p className="events_details_title">{eventName}</p>
        <p className="events_details_location">{eventLocation}</p>
        <p className="events_details_time">{eventStartIn}</p>

        <CountdownTimer timeLeft={timeLeft} />

        <div className="events_details_btn">
          <NavLink to={redirectUrl}>
            <button>Yes, I am in</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
