import React from "react";
import desertcity from "../../assets/desertcity.jpg";
import RecommendationCard from "../base/recommendationCards/recommendationCard";
import SelectDistance from "../base/selectdistance/selectdistance";

const UpcomingEventsPg: React.FC = () => {
  return (
    <div className="upcomingEventsPg">
      <h1 className="upcomingEventsPg_heading">Hey Vaibhav,</h1>

      <p className="upcomingEventsPg_text">
        Let's find something exciting for you.
      </p>

      <div className="upcomingEventsPg_date_and_distance">
        <div className="upcomingEventsPg_date">
          <p className="upcomingEventsPg_date_text">
            What suits your schedules?
          </p>

          <div className="upcomingEventsPg_date_location_btns">
            <button className="upcomingEventsPg_date_btn">Pick a date</button>
            <button className="upcomingEventsPg_location_btn">
              Pick a location
            </button>
          </div>
        </div>

        <SelectDistance />
      </div>

      <div className="upcomingEventsPg_eventsType">
        <p className="upcomingEventsPg_eventsType_text">
          You can always filter out the events by category wise.
        </p>

        <div className="upcomingEventsPg_eventsType_btns">
          <button className="upcomingEventsPg_eventsType_btn">
            Stand Up Comedy
          </button>
          <button className="upcomingEventsPg_eventsType_btn">RAMP Walk</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Box Cricket
          </button>
          <button className="upcomingEventsPg_eventsType_btn">Swimming</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Golf Tournament
          </button>
          <button className="upcomingEventsPg_eventsType_btn">Singing</button>
          <button className="upcomingEventsPg_eventsType_btn">
            Talks Shows
          </button>
          <button className="upcomingEventsPg_eventsType_btn">
            Kite Surfing
          </button>
          <button className="upcomingEventsPg_eventsType_btn">
            Book Exhibitions
          </button>
        </div>
      </div>

      <RecommendationCard length={20} />
    </div>
  );
};

export default UpcomingEventsPg;
