import Corousal from "./corousal/Corousal";
import React from "react";
import Buttons from "../LeftandRightButtons/buttons";
import "./Home.css";
import underwaterImg from "../../assets/neom-underwater.jpg";
import desertcity from "../../assets/desertcity.jpg";
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
  [21.7793, 72.589814, "swim"], // New Delhi
  [21.748583, 72.669192, "golf"], // Mumbai
  [21.697117, 72.607178, "location"], // Chennai
  [21.709793, 72.717977, "music"], // Kolkata
  [21.771237, 72.598909, "music"], // Bangalore
  [21.750119, 72.663818, "golf"], // Bangalore
  [21.715555, 72.620407, "music"], // Bangalore
];

export default function Home() {
  return (
    <>
      <div className="cancel_event_container">
        <div className="cancel_event">
          <p className="cancel_event_title">Hey Vaibhav!</p>
          <p className="cancel_event_description">
            Are you sure you want to cancel the event? <br />
          </p>

          <div className="cancel_event_btns">
            <button className="cancel_event_btn_yes">Yes</button>
            <button className="cancel_event_btn_no">No</button>
          </div>
        </div>
      </div>

      <div className="Home isblur">
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
                imgURL={index & 1 ? underwaterImg : desertcity}
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
