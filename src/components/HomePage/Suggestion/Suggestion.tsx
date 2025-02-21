import "./Suggestion.css";

interface SuggestionProps {
  imgUrl: string;
  title: string;
  description: string;
  dateandTime: string;
  food?: boolean;
  emoji_url: string;
}

export default function Suggestion({
  imgUrl,
  title,
  description,
  dateandTime,
  food,
  emoji_url,
}: SuggestionProps) {
  return (
    <div className="SuggestionContainer">
      <div className="SuggestionImgandDescriptionContainer">
        <img src={emoji_url} alt="Emoji Face" className="emojiImg" />
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
