import React, { use } from "react";
import { useNavigate } from "react-router-dom";

interface VisitedProps {
  imgUrl: string;
  title: string;
  attented: string | number;
  dateandTime: string;
  rating: number;
  eventId: string;
}

const Visited: React.FC<VisitedProps> = ({
  imgUrl,
  title,
  attented,
  dateandTime,
  rating,
  eventId,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/event-details?eventId=${eventId}`)}
        className="visitedContainer"
      >
        <div className="visitedContainer_imgContainer">
          <img id="visitedContainer_img" src={imgUrl} alt="underwaterImg" />
        </div>

        <div className="visitedContainer_description">
          <p className="visitedContainer_description_title">{title}</p>
          <p className="visitedContainer_description_attented">
            {attented} guest attented this event
          </p>
          <p className="visitedContainer_description_dateandTime">
            on {dateandTime}
          </p>
        </div>

        {rating == undefined ? (
          <button>Rate this event</button>
        ) : (
          <p className="visitedContainer_rating_stars">
            You rated this event
            <span className="visitedContainer_rating_stars_black">
              {Array.from({ length: (rating % 5) + 1 }, (_, index) => (
                <span key={index}>★</span>
              ))}
            </span>
          </p>
        )}
      </div>
    </>
  );
};

export default Visited;
