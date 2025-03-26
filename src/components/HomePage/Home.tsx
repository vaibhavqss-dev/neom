import React, { memo } from "react";
import MapWithPoints from "./maps/maps";
import ItinerarieSlider from "./corousal/ItinerarieSlider";
import SuggestionSlider from "./Suggestion/SuggestionSlider";
import VisitedSlider from "./visited/VisitedSlider";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";
import { useSelector, useDispatch } from "react-redux";

const Home: React.FC = () => {
  const fullname = localStorage.getItem("fullname");

  const token = useSelector((state: any) => state.login);
  console.log("TOKEN", token);

  return (
    <div className="home isblur">
      <p className="home_title">Good Morning {fullname}</p>
      <p className="home_subtitle">
        Below listed are your itineraries, have a look to the timing and the
        location <br />
        We wish you to enjoy the activities and the weather
      </p>
      <ItinerarieSlider />
      <SuggestionSlider />
      <div className="recommandationSection">
        <div className="recommandationSection_container">
          <RecommendationCardContainer IsRank number={5} />
        </div>
      </div>
      <VisitedSlider />
      <MapWithPoints />
    </div>
  );
};

export default memo(Home);
