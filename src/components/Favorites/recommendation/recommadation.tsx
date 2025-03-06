import React from "react";
import smileGreenFace from "./../../../assets/img/smileGreenFace.svg";
import { useNavigate } from "react-router-dom";

interface RecommadationProps {
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
  eventId: string;
}

const FavoritesRecommendationCard: React.FC<RecommadationProps> = ({
  imgURL,
  name,
  category,
  date,
  time,
  face,
  eventId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/event-details?eventId=${eventId}`)}
      className="recommadation_container"
    >
      <div className="recommadation_img_container">
        <img id="recommadation_img" src={imgURL} alt="underwater" />
        <div className="recommadation_text"></div>
      </div>

      <div className="recommadation_container_text_overlay">
        <div className="recommadation_container_text_overlay_left">
          <p className="recommadation_img_title">{name}</p>
          <p className="recommadation_img_type">{date}</p>
          <p className="recommadation_img_time">{time}</p>
        </div>

        <div className="recommadation_container_text_overlay_right">
          <img
            id="recommadation_container_text_overlay_right_smileface"
            src={face}
            alt="smile"
          />
          <p className="recommadation_container_text_overlay_right_text">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoritesRecommendationCard;
