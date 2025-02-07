import { useEffect, useRef } from "react";
import Suggestion from "./Suggestion";
import food from "../../../assets/food.jpg";
import city from "../../../assets/city.jpg";

import emojiImg from "../../../assets/emoji-sad.svg";
import emojiHappy from "../../../assets/emoji-happy.svg";

import Buttons from "../../LeftandRightButtons/buttons";

const SuggestionSlider = () => {
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

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
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
    <div className="SuggestionSection">
      <div className="suggestionSection_title">
        <p>Vaibhav Hope, We Understand You Better</p>
      </div>
      <div
        ref={sliderRef}
        className="SuggestionSectionSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Suggestion
            imgUrl={food}
            title="Shudh Bihari Restaurant"
            description="just adfja dfafkjsalsdfasf asdfasfsdafsa afsafsafs afsafd afasa s sa fasfasdfa fdfk ajdfjasdfkasjf salkf jdsafklasjfasfjskfjasldkfjaslkdfjaslfkjasflkasjfslfj"
            dateandTime={new Date().toDateString()}
            food
            emoji_url={emojiHappy}
          />
        ))}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default SuggestionSlider;
