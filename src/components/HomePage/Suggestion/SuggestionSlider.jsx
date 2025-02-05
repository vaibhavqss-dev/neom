import { useRef } from "react";
import Suggestion from "./Suggestion";
import food from "../../../assets/food.jpg";
import city from "../../../assets/city.jpg";

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
          />
        ))}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default SuggestionSlider;
