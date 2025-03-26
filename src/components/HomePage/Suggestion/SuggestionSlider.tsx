import { useRef } from "react";
import Suggestion from "./Suggestion";
import Buttons from "../../LeftandRightButtons/buttons";
import { useSelector, useDispatch } from "react-redux";
import { removeSuggestionReducer } from "../../../Redux/reducers/suggestion";

const SuggestionSlider: React.FC = () => {
  const dispatch = useDispatch();
  const suggestion = useSelector((state: any) => state.suggestion);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const removeSuggestion = (id: string) => {
    dispatch(removeSuggestionReducer(id));
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
        {suggestion.length ? (
          suggestion.map((suggestion: any) => (
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
      {suggestion.length > 0 && (
        <Buttons scrollLeft={scrollLeft} scrollRight={scrollRight} />
      )}
    </div>
  );
};

export default SuggestionSlider;
