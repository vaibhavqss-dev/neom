import React, { useEffect, useRef } from "react";
import Recommadation from "./recommadation";
import underwaterImg from "./../../../assets/neom-underwater.jpg";
import desertcity from "./../../../assets/desertcity.jpg";
import smileGreenFace from "./../../../assets/smileGreenFace.svg";

import Buttons from "../../LeftandRightButtons/buttons";

export default function RecommadationSlider() {
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

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      if (direction === 1) {
        scrollRight();
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          direction = 0;
        }
      } else {
        scrollLeft();
        if (sliderRef.current.scrollLeft <= 0) {
          direction = 1;
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="favorites_recommendation">
      <p className="favorites_recommendation_title">
        Vaibhav, we've found some recommended for you
      </p>
      <div ref={sliderRef} className="favorites_recommendation_container">
        {Array.from({ length: 10 }).map((_, index) => (
          <Recommadation
            key={index}
            imgURL={index & 1 ? underwaterImg : desertcity}
            name={index & 1 ? "Underwater" : "Desert City"}
            category={"Active and Adventurous"}
            date={new Date().toLocaleDateString()}
            time={`${10 + index}:00 AM - ${7 + index}:00 PM`}
            face={smileGreenFace}
          />
        ))}
      </div>

      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
}
