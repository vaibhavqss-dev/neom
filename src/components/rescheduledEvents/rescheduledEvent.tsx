import React from "react";
import desertcity from "../../assets/desertcity.jpg";
import SelectDistance from "../base/selectdistance/selectdistance";
import RecommendationCard from "../base/recommendationCards/recommendationCard";

interface RescheduledEventProps {
  //   event: string;
}

const RescheduledEvent: React.FC<RescheduledEventProps> = ({}) => {
  return (
    <div className="rescheduledEventPg">
      <div className="rescheduledEventPg_headers">
        <h1>Hey Vaibhav,</h1>
        <p>
          We have a few similar event for you against your today's rescheduled
          event of "Round of Golf". And one of them is just starting in an hour
          and 5 minutes drive away.
        </p>
      </div>

      <div className="rescheduledEventPg_imgContainer">
        <img src={desertcity} alt="event" />

        <div className="rescheduledEventPg_imgContainer_overlay">
          <div className="rescheduledEventPg_imgContainer_overlay_text">
            <h1>Round of Golf</h1>
            <p>Sindalah Island</p>
            <p>
              Jan 01, 2023 <br />
              7:00 AM | 11:00 AM | 3:00 PM
            </p>
          </div>

          <button>Reschedule</button>
        </div>
      </div>

      <div className="rescheduledEventPg_recommendation">
        <p className="rescheduledEventPg_recommendation_text">
          Some similar recommendation for you, Vaibhav.
        </p>
        <SelectDistance />
        <RecommendationCard length={10} />
      </div>
    </div>
  );
};

export default RescheduledEvent;
