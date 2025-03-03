import React, { JSX } from "react";
import { useEffect, useState } from "react";
import FavoritesImg from "./FavoritesImg/FavoritesImg";
import underwaterImg from "./../../assets/neom-underwater.jpg";
import desertcity from "./../../assets/desertcity.jpg";
import smileGreenFace from "./../../assets/smileGreenFace.svg";

import RecommadationSlider from "./recommendation/recommadationSlider";
import HomepageRecommadation from "../HomePage/recommadation/recommadation";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";

type FavoriteItem = JSX.Element;
const Favorites: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState<FavoriteItem[]>([]);

  const onFavoriteRemove = (index: number) => {
    // console.log("Remove", index);
    setIsFavorite((prev) =>
      prev.filter((ele) => parseInt(ele.key as string) !== index)
    );
  };

  useEffect(() => {
    const favoritesArray = Array.from({ length: 10 }).map((_, index) => (
      <FavoritesImg
        key={index}
        index={index}
        onFavoriteRemove={onFavoriteRemove}
        imgURL={index & 1 ? underwaterImg : desertcity}
        name={index & 1 ? "Underwater" : "Desert City"}
        category={"Active and Adventurous"}
        date={new Date().toLocaleDateString()}
        time={`${10 + index}:00 AM - ${7 + index}:00 PM`}
        face={smileGreenFace}
      />
    ));

    setIsFavorite(favoritesArray);
  }, []);

  return (
    <>
      <div className="favoritesPg">
        <p className="favoritesPg_greet">Good Morning Vaibhav!</p>
        <p className="favoritesPg_description">
          You have short listed 8 events to join later
        </p>

        <div className="favoritesPg_container">{isFavorite}</div>

        <RecommadationSlider />

        <div className="favoritesPgRecommandation_section">
          <p className="favoritesPgRecommandation_section-title">
            Top 5 activities on this Island today
          </p>

          <div className="favoritesPgRecommandation_section-slider">
            <RecommendationCardContainer IsRank number={5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
