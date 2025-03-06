import { useEffect, useRef } from "react";
import Itinerari from "./Itinerari";
import cardImage from "../../../assets/img/holiday_0.png";
import emojiFaceImg from "../../../assets/img/overwhelmed.svg";
import Buttons from "../../LeftandRightButtons/buttons";

const ItinerarieSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
    let direction = "right";
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      if (direction === "right") {
        scrollRight();
        if (
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
          sliderRef.current.scrollWidth
        ) {
          direction = "left";
        }
      } else {
        scrollLeft();
        if (sliderRef.current.scrollLeft <= 0) {
          direction = "right";
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* <button onClick={scrollLeft}>Left</button>
      <button onClick={scrollRight}>Right</button> */}
      <div
        ref={sliderRef}
        className="CorousalSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Itinerari
            emojiFaceImg={emojiFaceImg}
            eventId={index}
            key={index}
            title="Round of Golf"
            description="lorem kfjasfdk alkadsjd dfslkf j s fst amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime={new Date().toDateString()}
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={cardImage}
            stars={index + 1}
            reviews={index + 4}
            Scheduled
          />
        ))}
      </div>

      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default ItinerarieSlider;
