import React from "react";
import MapWithPoints from "./maps/maps";
import ItinerarieSlider from "./corousal/ItinerarieSlider";
import SuggestionSlider from "./Suggestion/SuggestionSlider";
import VisitedSlider from "./visited/VisitedSlider";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";

    const Home: React.FC = () => {
  return (
    <div className="home isblur">
      <p className="home_title">Good Morning Vaibhav!</p>
      <p className="home_subtitle">
        {" "}
        Below listed are your itineraries, have a look to the timing and the
        location <br />
        We wish you to enjoy the activities and the weather
      </p>
      <ItinerarieSlider />
      <SuggestionSlider />
      <div className="recommandationSection">
        <p className="recommandationSection_title">
          Today's recommadation for you, Vaibhav
        </p>

        <div className="recommandationSection_container">
          <RecommendationCardContainer IsRank number={5} />
        </div>
      </div>
      <VisitedSlider />
      <MapWithPoints />;
    </div>
  );
};
export default Home;
