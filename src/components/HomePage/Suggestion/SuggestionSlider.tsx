import { useEffect, useRef, useState } from "react";
import Suggestion from "./Suggestion";
import food from "../../../assets/img/chinese.png";
import islandImg from "../../../assets/img/island.jpg";
import smileGreenFace from "../../../assets/img/overwhelmed.svg";
import boredomFace from "../../../assets/img/disappointed.svg";
import Buttons from "../../LeftandRightButtons/buttons";

const SuggestionSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const initialSuggestions = Array.from({ length: 10 }).map((_, index) => ({
    id: `suggestion-${index}`,
    imgUrl: index & 1 ? food : islandImg,
    title: index & 1 ? "Chinese Cuisine" : "Island Resort",
    description:
      index & 1
        ? "Enjoy the best Chinese food in town lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        : "Relax and enjoy the view",
    dateandTime: new Date().toDateString(),
    food: index & 1 ? true : false,
    emoji_url: index & 1 ? smileGreenFace : boredomFace,
  }));

  // State to track current suggestions
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  // Function to remove a suggestion
  const removeSuggestion = (id: string) => {
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id));
  };

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

  return (
    <div className="SuggestionSection">
      <div className="suggestionSection_title">
        <p>Vaibhav, hope we understand you better</p>
      </div>
      <div
        ref={sliderRef}
        className="SuggestionSectionSlider"
        style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {suggestions.length ? (
          suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              imgUrl={suggestion.imgUrl}
              title={suggestion.title}
              description={suggestion.description}
              dateandTime={suggestion.dateandTime}
              food={suggestion.food}
              emoji_url={suggestion.emoji_url}
              eventId={suggestion.id}
              onRemove={() => removeSuggestion(suggestion.id)}
            />
          ))
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
      <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </div>
  );
};

export default SuggestionSlider;
