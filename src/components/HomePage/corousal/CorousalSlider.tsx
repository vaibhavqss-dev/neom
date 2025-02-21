import { useEffect, useRef } from "react";
import Corousal from "./Corousal";
import underwaterImg from "../../../assets/neom-underwater.jpg";
import Buttons from "../../LeftandRightButtons/buttons";

const CarouselSlider: React.FC = () => {
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
