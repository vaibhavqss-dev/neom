import { useRef } from "react";
import Corousal from "./Corousal";
import underwaterImg from "../../../assets/neom-underwater.jpg";
import Buttons from "../../LeftandRightButtons/buttons";

const CarouselSlider = () => {
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
    <div>
      {/* <button onClick={scrollLeft}>Left</button>
      <button onClick={scrollRight}>Right</button> */}
      <div
        ref={sliderRef}
        className="CorousalSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Corousal
            key={index}
            title="Round of Golf"
            description="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            dateandTime={new Date().toDateString()}
            locationName="Chapra bihar"
            categoryName="Golf"
            ImgUrl={underwaterImg}
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

export default CarouselSlider;
