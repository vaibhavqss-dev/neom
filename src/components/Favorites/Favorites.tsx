import React, { JSX } from "react";
import { useEffect, useState } from "react";
import ShortListedCard from "./ShortListedCard/ShortListedCard";
import underwaterImg from "./../../assets/img/neom-underwater.jpg";
import desertcity from "./../../assets/img/desertcity.jpg";
import smileGreenFace from "./../../assets/img/smileGreenFace.svg";

import FavoritesRecommendationSlider from "./recommendation/recommadationSlider";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";

type ShortListed = {
  key: string;
  eventid: string;
  onFavoriteRemove: (index: number) => void;
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
};
const Favorites: React.FC = () => {
  const [ShortListed, setShortListed] = useState<ShortListed[]>([]);

  const onFavoriteRemove = (index: number) => {
    setShortListed((prev) =>
      prev.filter((ele) => parseInt(ele.key as string) !== index)
    );
  };

  useEffect(() => {
    const favoritesArray = Array.from({ length: 10 }).map((_, index) => ({
      key: index.toString(),
      eventid: index.toString(),
      onFavoriteRemove: onFavoriteRemove,
      imgURL: index & 1 ? underwaterImg : desertcity,
      name: index & 1 ? "Underwater" : "Desert City",
      category: "Active and Adventurous",
      date: new Date().toLocaleDateString(),
      time: `${10 + index}:00 AM - ${7 + index}:00 PM`,
      face: smileGreenFace,
    }));

    setShortListed(favoritesArray);
  }, []);

  return (
    <>
      <div className="favoritesPg">
        <p className="favoritesPg_greet">Good Morning Vaibhav!</p>
        <p className="favoritesPg_description">
          You have short listed 8 events to join later
        </p>

        <div className="favoritesPg_container">
          {ShortListed.map((ele: ShortListed) => (
            <ShortListedCard
              key={ele.key}
              index={parseInt(ele.key)}
              onFavoriteRemove={ele.onFavoriteRemove}
              imgURL={ele.imgURL}
              name={ele.name}
              category={ele.category}
              date={ele.date}
              time={ele.time}
              face={ele.face}
            />
          ))}
        </div>

        <FavoritesRecommendationSlider />

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
