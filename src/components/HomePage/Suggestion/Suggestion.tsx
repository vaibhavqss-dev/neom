import { useNavigate } from 'react-router-dom';

interface SuggestionProps {
  imgUrl: string;
  title: string;
  description: string;
  dateandTime: string;
  food?: boolean;
  emoji_url: string;
  eventId: string | number; // Add eventId prop
  onRemove: () => void; // Add callback for removal
}

export default function Suggestion({
  imgUrl,
  title,
  description,
  dateandTime,
  food,
  emoji_url,
  eventId,
  onRemove,
}: SuggestionProps) {
  const navigate = useNavigate();

  // Handle accept button click
  const handleAccept = () => {
    navigate(`/event-details?eventId=${eventId}`);
  };

  // Handle remind later button click
  const handleRemind = () => {
    onRemove();
  };

  return (
    <div className="SuggestionContainer">
      <div className="SuggestionContainer_img">
        <img
          src={emoji_url}
          alt="Emoji Face"
          className="SuggestionContainer_img_emoji"
        />
        <img src={imgUrl} alt="food" className="SuggestionContainer_imgIMG" />
      </div>

      <div className="SuggestionContainer_img_description">
        {title} <br />
        <span className="SuggestionContainer_img_description_subtext">
          {dateandTime}
        </span>
      </div>
      <div className="suggestion_text">
        <p className="suggestion_text_description">{description}</p>
        <div className="suggestion_textButton">
          <button 
            className="suggestion_textButton_button_yes" 
            onClick={handleAccept}
          >
            {food ? "Yes, I Accept" : "Yes, I would share"}
          </button>
          <button 
            className="suggestion_textButton_button_no"
            onClick={handleRemind}
          >
            {food ? "No, thanks" : "Remind me later"}
          </button>
        </div>
      </div>
    </div>
  );
}
