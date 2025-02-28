import React from "react";
import MapWithPoints from "./maps/maps";
import CarouselSlider from "./corousal/CorousalSlider";
import SuggestionSlider from "./Suggestion/SuggestionSlider";
import VisitedSlider from "./visited/VisitedSlider";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";

const coordinates: [number, number, string][] = [
  [21.7793, 72.589814, "swim"], // New Delhi
  [21.748583, 72.669192, "golf"], // Mumbai
  [21.697117, 72.607178, "location"], // Chennai
  [21.709793, 72.717977, "music"], // Kolkata
  [21.771237, 72.598909, "music"], // Bangalore
  [21.750119, 72.663818, "golf"], // Bangalore
  [21.715555, 72.620407, "music"], // Bangalore
];

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
      <CarouselSlider />
      <SuggestionSlider />
      <div className="recommandationSection">
        <p className="recommandationSection_title">
          Today's recommadation for you, Vaibhav
        </p>

        <div className="recommandationSection_container">
          <RecommendationCardContainer number={5} />
        </div>
      </div>
      <VisitedSlider />
      <MapWithPoints coordinates={coordinates} />;
    </div>
  );
};
export default Home;
