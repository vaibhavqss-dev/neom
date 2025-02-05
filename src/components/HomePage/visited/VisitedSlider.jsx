import { useRef } from "react";
import Visited from "./visited";
import city from "../../../assets/city.jpg";
import Buttons from "../../LeftandRightButtons/buttons";

const VisitedSlider = () => {
  const sliderRef = useRef(null);

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
