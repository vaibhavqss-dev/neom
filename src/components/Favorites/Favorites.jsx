import React from "react";
import "./Favorites.css";
import FavoritesImg from "./FavoritesImg/FavoritesImg";
import underwaterImg from "./../../assets/neom-underwater.jpg";
import desertcity from "./../../assets/desertcity.jpg";
import smileGreenFace from "./../../assets/smileGreenFace.svg";

import RecommadationSlider from "./recommendation/recommadationSlider";
import HomepageRecommadation from "../HomePage/recommadation/recommadation";

export default function Favorites() {
  return (
    <>
      <div className="favoritesPg">
        <p className="favoritesPg_greet">Good Morning Vaibhav!</p>
        <p className="favoritesPg_description">
          You have short listed 8 events to join later
        </p>

        <div className="favoritesPg_container">
          {Array.from({ length: 10 }).map((_, index) => (
            <FavoritesImg
              imgURL={index & 1 ? underwaterImg : desertcity}
              name={index & 1 ? "Underwater" : "Desert City"}
              category={"Active and Adventurous"}
              date={new Date().toLocaleDateString()}
              time={`${10 + index}:00 AM - ${7 + index}:00 PM`}
              face={smileGreenFace}
            />
          ))}
        </div>

        <RecommadationSlider />

        <div className="favoritesPg_recommandation_section">
          <p className="favoritesPg_recommandation_section-title">
            Top 5 activities on this Island today
          </p>

          <div className="favoritesPg_recommandation_section-slider">
            {Array.from({ length: 5 }).map((_, index) => (
              <HomepageRecommadation
                imgURL={index & 1 ? underwaterImg : desertcity}
                rank={index + 1}
                name="Desert Walking"
                subtext={"Tour on land of desert"}
                date={new Date().toLocaleDateString()}
                time={`${10 + index}:00 AM - ${7 + index}:00 PM`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
