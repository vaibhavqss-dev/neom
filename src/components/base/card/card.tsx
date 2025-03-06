import React from "react";
import { useNavigate } from "react-router-dom";

type CardProps = {
  eventId: string;
  index: number;
  category: string;
  date: string;
  time: string;
  name: string;
  subtextName: string;
  subtextDate: string;
  timeRange: string;
  location: string;
  imgURL: string;
  isLiked?: boolean;
  handleLike?: (id: string, name: string) => void;
  IsRank?: boolean;
};

const Card: React.FC<CardProps> = ({
  index,
  eventId,
  imgURL,
  subtextDate,
  subtextName,
  name,
  timeRange,
  location,
  category,
  date,
  time,
  isLiked,
  handleLike,
  IsRank,
}) => {
  const onLikedHandle = () => {
    if (eventId === undefined) return;
    console.log("Liked Event: ", eventId, name);
    handleLike && handleLike(eventId, name);
  };
  const navigate = useNavigate();

  return (
    <div className="recommendationCards">
      <div className="recommendationCards_card" key={index}>
        <div
          onClick={() => navigate(`/event-details?eventId=${eventId}`)}
          className="recommendationCards_card_img_container"
        >
          <img
            src={imgURL}
            alt="Upcoming Events"
            className="recommendationCards_card_img"
          />
        </div>
        <div className="recommendationCards_card_text">
          <div className="recommendationCards_card_text_</div>subtext">
            <p className="recommendationCards_card_text_subtext_name">
              {subtextName}
            </p>
            <p className="recommendationCards_card_text_subtext_date">
              {subtextDate}
            </p>
          </div>

          <p className="recommendationCards_card_text_name">{name}</p>

          <p className="recommendationCards_card_text_time">{timeRange}</p>
        </div>
        <div
          onClick={() => onLikedHandle()}
          className={
            isLiked
              ? "recommendationCards_card_heart isLiked"
              : "recommendationCards_card_heart"
          }
        ></div>
        {IsRank && <div className="recommendationCards_cardRank">{index}</div>}
      </div>
    </div>
  );
};

export default Card;
