import React from "react";

type RecommendationCardProps = {
  id?: number;
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
  handleLike?: (id: number, name: string) => void;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  index,
  id,
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
}) => {
  return (
    <div className="recommendationCards">
      <div className="recommendationCards_card" key={index}>
        <div className="recommendationCards_card_img_container">
          <img
            src={imgURL}
            alt="Upcoming Events"
            className="recommendationCards_card_img"
          />
        </div>

        <div className="recommendationCards_card_text">
          <div className="recommendationCards_card_text_subtext">
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
        {/* isLiked */}
        <div
          onClick={() => handleLike && id !== undefined && handleLike(id, name)}
          className={
            isLiked
              ? "recommendationCards_card_heart isLiked"
              : "recommendationCards_card_heart"
          }
        ></div>
      </div>
    </div>
  );
};

export default RecommendationCard;
