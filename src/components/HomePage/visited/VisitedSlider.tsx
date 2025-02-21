import { useEffect, useRef } from "react";
import Visited from "./visited";
import city from "../../../assets/city.jpg";
import Buttons from "../../LeftandRightButtons/buttons";

const VisitedSlider: React.FC = () => {
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
    <div className="visitedSection">
      <div className="visitedSection_title">
        <p>Vaibhav, here is your master journey with us so far</p>
      </div>
      <div
        ref={sliderRef}
        className="visitedSectionSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Visited
            imgUrl={city}
            title="Round of Golf"
            attented={index + 1}
            dateandTime={new Date().toDateString()}
            rating={index + 1}
          />
        ))}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default VisitedSlider;
