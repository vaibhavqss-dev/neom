import React from "react";
import { useNavigate } from "react-router-dom";

type FavoritesImgProps = {
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
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
  onFavoriteRemove,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/event-details?eventId=${index}`)}
      className="favorites_img_container"
    >
      <div className="favorites_img_container">
        <button
          onClick={() =>
            onFavoriteRemove && onFavoriteRemove(parseInt(index.toString()))
          }
          className="favorites_img_remove_btn"
        >
          Remove
        </button>
        <img id="favorites_img" src={imgURL} alt="underwater" />
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
