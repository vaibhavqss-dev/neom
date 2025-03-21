import React from "react";
import { useNavigate } from "react-router-dom";

type FavoritesImgProps = {
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
  event_id: string;
  index: number;
  onFavoriteRemove?: (index: number) => void;
};

const ShortListedCard: React.FC<FavoritesImgProps> = ({
  imgURL,
  name,
  category,
  date,
  time,
  face,
  index,
  event_id,
  onFavoriteRemove,
}) => {
  const navigate = useNavigate();
  return (
    <div className="favorites_img_container">
      <div className="favorites_img_container">
        <button
          onClick={() =>
            onFavoriteRemove && onFavoriteRemove(parseInt(event_id))
          }
          className="favorites_img_remove_btn"
        >
          Remove
        </button>
        <img
          onClick={() => navigate(`/event-details?eventId=${event_id}`)}
          id="favorites_img"
          src={imgURL}
          alt="underwater"
        />
      </div>

      <p className="favorites_img_type">
        <p className="favorites_img_type_text">
          <img id="smileface" src={face} alt="smile" />
          {category}
        </p>
        <p className="favorites_img_type_date">{date}</p>
      </p>

      <p className="favorites_img_title">{name}</p>
      <p className="favorites_img_time">{time}</p>
    </div>
  );
};

export default ShortListedCard;
