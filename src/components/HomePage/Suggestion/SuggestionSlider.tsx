import { useEffect, useRef, useState } from "react";
import Suggestion from "./Suggestion";
import food from "../../../assets/img/chinese.png";
import islandImg from "../../../assets/img/island.jpg";
import smileGreenFace from "../../../assets/img/overwhelmed.svg";
import boredomFace from "../../../assets/img/disappointed.svg";
import Buttons from "../../LeftandRightButtons/buttons";

interface SuggestionItem {
  id: string;
  imgUrl: string;
  title: string;
  description: string;
  dateandTime: string;
  food: boolean;
  emoji_url: string;
}

const SuggestionSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const initialSuggestions = Array.from({ length: 3 }).map((_, index) => ({
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
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  // Load suggestions from localStorage on component mount
  useEffect(() => {
    const userId = localStorage.getItem("user_id") || "default_user";
    const storedSuggestions = localStorage.getItem(`suggestions_${userId}`);
    const removedSuggestions = JSON.parse(
      localStorage.getItem(`removed_suggestions_${userId}`) || "[]"
    );

    if (storedSuggestions) {
      setSuggestions(JSON.parse(storedSuggestions));
    } else {
      // Filter out any suggestions that are in the removedSuggestions list
      const filteredSuggestions = initialSuggestions.filter(
        (suggestion) => !removedSuggestions.includes(suggestion.id)
      );
      setSuggestions(filteredSuggestions);

      // Save initial filtered suggestions to localStorage
      localStorage.setItem(
        `suggestions_${userId}`,
        JSON.stringify(filteredSuggestions)
      );
    }
  }, []);

  // Function to remove a suggestion
  const removeSuggestion = (id: string) => {
    const userId = localStorage.getItem("user_id") || "default_user";

    // Update state
    const updatedSuggestions = suggestions.filter(
      (suggestion) => suggestion.id !== id
    );
    setSuggestions(updatedSuggestions);

    // Save updated suggestions to localStorage
    localStorage.setItem(
      `suggestions_${userId}`,
      JSON.stringify(updatedSuggestions)
    );

    // Add suggestion ID to removed suggestions list
    const removedSuggestions = JSON.parse(
      localStorage.getItem(`removed_suggestions_${userId}`) || "[]"
    );
    removedSuggestions.push(id);
    localStorage.setItem(
      `removed_suggestions_${userId}`,
      JSON.stringify(removedSuggestions)
    );
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
      {suggestions.length > 0 && (
        <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
      )}
    </div>
  );
};

export default SuggestionSlider;
