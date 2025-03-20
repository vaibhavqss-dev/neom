import { useEffect, useRef, useState } from "react";
import FavoritesRecommendationCard from "./recommadation";
import smileGreenFace from "./../../../assets/img/smileGreenFace.svg";

import Buttons from "../../LeftandRightButtons/buttons";

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

  // useEffect(() => {
  //   let direction = 1;
  //   const interval = setInterval(() => {
  //     if (!sliderRef.current) return;
  //     if (direction === 1) {
  //       scrollRight();
  //       if (
  //         sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
  //         sliderRef.current.scrollWidth
  //       ) {
  //         direction = 0;
  //       }
  //     } else {
  //       scrollLeft();
  //       if (sliderRef.current.scrollLeft <= 0) {
  //         direction = 1;
  //       }
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  const [recommendations, setRecommendations] = useState<any[]>([]);
  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3001/api/user/recommendation`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setRecommendations(data.event);
      } catch (error) {
        console.error("API error:", error);
      }
    }
    fetchRecommendations();
  }, []);

  return (
    <div className="favorites_recommendation">
      <p className="favorites_recommendation_title">
        Vaibhav, we've found some recommendation for you
      </p>
      <div ref={sliderRef} className="favorites_recommendation_container">
        {recommendations.map((ele: any, index) => (
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
        ))}
      </div>

      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
}
