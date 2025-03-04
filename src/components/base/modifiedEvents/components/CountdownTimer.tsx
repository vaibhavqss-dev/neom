import React from "react";
import CircleProgress from "./CircleProgress";
import { TimeLeft } from "../hooks/useCountdownTimer";

type CountdownTimerProps = {
  timeLeft: TimeLeft;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  return (
    <div className="events_details_countdown">
      <CircleProgress
        value={timeLeft.days}
        maxValue={timeLeft.days > 0 ? timeLeft.days : 1}
        color="#FD9A01"
      >
        <div className="events_details_countdown_circle_type">DAYS</div>
        <div className="events_details_countdown_circle_value">
          {timeLeft.days}
        </div>
      </CircleProgress>

      <CircleProgress value={timeLeft.hours} maxValue={24} color="#009AFF">
        <div className="events_details_countdown_circle_type">HOURS</div>
        <div className="events_details_countdown_circle_value">
          {timeLeft.hours}
        </div>
      </CircleProgress>

      <CircleProgress value={timeLeft.minutes} maxValue={60} color="#FFDF46">
        <div className="events_details_countdown_circle_type">MINUTES</div>
        <div className="events_details_countdown_circle_value">
          {timeLeft.minutes}
        </div>
      </CircleProgress>

      <CircleProgress value={timeLeft.seconds} maxValue={60} color="#FF385C">
        <div className="events_details_countdown_circle_type">SECONDS</div>
        <div className="events_details_countdown_circle_value">
          {timeLeft.seconds}
        </div>
      </CircleProgress>
    </div>
  );
};

export default CountdownTimer;
