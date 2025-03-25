import { useEffect, useRef, useState } from "react";
import FavoritesRecommendationCard from "./recommadation";
import smileGreenFace from "./../../../assets/img/smileGreenFace.svg";
import Buttons from "../../LeftandRightButtons/buttons";
import { get_data } from "../../../api/api";

export default function FavoritesRecommendationSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  async function fetchRecommendations() {
    try {
      const data = await get_data(`/user/recommendation`);
      setRecommendations(data.event);
    } catch (error) {
      console.error("API error:", error);
    }
  }
  const [recommendations, setRecommendations] = useState<any[]>([]);
  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="favorites_recommendation">
      <p className="favorites_recommendation_title">
        {localStorage.getItem("fullname")}, we've found some recommendation for
        you
      </p>
      <div ref={sliderRef} className="favorites_recommendation_container">
        {recommendations.length != 0 ? (
          recommendations.map((ele: any, index) => (
            <FavoritesRecommendationCard
              eventId={ele.event_id}
              key={index}
              imgURL={ele.event.image_urls[0]}
              name={ele.event.title}
              category={ele.event.category}
              date={ele.event.date[0]}
              time={ele.event.time[0]}
              face={smileGreenFace}
            />
          ))
        ) : (
          <p>No New recommendations found, Please come after some time</p>
        )}
      </div>
      {recommendations.length > 1 && (
        <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
      )}
    </div>
  );
}
