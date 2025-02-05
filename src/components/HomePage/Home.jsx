import Corousal from "./corousal/Corousal";
import React from "react";
import Buttons from "../LeftandRightButtons/buttons";
import "./Home.css";
import underwaterImg from "../../assets/neom-underwater.jpg";
import Suggestion from "./Suggestion/Suggestion";
import food from "../../assets/food.jpg";
import city from "../../assets/city.jpg";
import Recommadation from "./recommadation/recommadation";
import Visited from "./visited/visited";
import Map from "./map/map";
import Footer from "./footer/footer";
import MapWithPoints from "./maps/maps";
import CarouselSlider from "./corousal/CorousalSlider";
import SuggestionSlider from "./Suggestion/SuggestionSlider";
import VisitedSlider from "./visited/VisitedSlider";

const coordinates = [
  [28.6139, 77.209, "swim"], // New Delhi
  [19.076, 72.8777, "golf"], // Mumbai
  [13.0827, 80.2707, "location"], // Chennai
  [22.5726, 88.3639, "music"], // Kolkata
  [12.9716, 77.5946, "swim"], // Bangalore
  [23.0225, 72.5714, "shopping"], // Ahmedabad
  [18.5204, 73.8567, "shopping"], // Pune
  [26.9124, 75.7873, "shopping"], // Jaipur
  [21.1702, 72.8311, "shopping"], // Surat
  [11.0168, 76.9558, "school"], // Coimbatore
];

export default function Home() {
  return (
    <>
      <div className="Home">
        <p className="Home_title">Good Morning Vaibhav!</p>
        <p>
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
            {Array.from({ length: 5 }).map((_, index) => (
              <Recommadation
                rank={index + 1}
                name="Desert Walking"
                subtext={"Tour on land of desert"}
                date={new Date().toLocaleDateString()}
                // {/* 10:00 AM - 7:00 PM */}   
                time={`${10 + index}:00 AM - ${7 + index}:00 PM`}
              />
            ))}
          </div>
        </div>


        
        <VisitedSlider />
        <MapWithPoints coordinates={coordinates} />;
      </div>
      <Footer />
    </>
  );
}
