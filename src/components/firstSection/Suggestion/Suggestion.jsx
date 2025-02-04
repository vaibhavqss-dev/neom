import "./Suggestion.css";
import food from "../../../assets/food.jpg";

export default function Suggestion({
  imgUrl,
  title,
  description,
  dateandTime,
  food
}) {
  return (
    <div className="SuggestionContainer">
      {/* <p className="SuggestionTitle">Charlie Hope, We Understand you better</p> */}

      <div className="SuggestionImgandDescriptionContainer">
        <img src={imgUrl} alt="food" className="SuggestionImg" />
        <div className="SuggestionImg_description">
          {title} <br />
          <span className="SuggestionImg_description_subtext">
            {dateandTime}
          </span>
        </div>
      </div>

      <div className="suggestion_text">
      {description}
        <div className="suggestion_textButton">
          <button className="suggestion_textButton_button_yes">
            {food ? "Yes, I Accept" : "Yes, I would share"}
          </button>
          <button className="suggestion_textButton_button_no">
            {food ? "No, thanks" : "Remind me later"}
          </button>
        </div>
      </div>
      
    </div>
  );
}
