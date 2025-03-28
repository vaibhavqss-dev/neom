import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/ModelContext";

interface VisitedProps {
  imgUrl: string;
  title: string;
  attented: string | number;
  dateandTime: string;
  rating: number;
  eventId: string;
  addReview?: boolean;
}

const Visited: React.FC<VisitedProps> = ({
  imgUrl,
  title,
  attented,
  dateandTime,
  rating,
  eventId,
  addReview = false,
}) => {
  const navigate = useNavigate();

  const { openModal } = useModal();
  return (
    <>
      <div className="visitedContainer">
        <div className="visitedContainer_imgContainer">
          <img
            onClick={() =>
              navigate(`/event-details?eventId=${eventId}&isScheduled=1`)
            }
            id="visitedContainer_img"
            src={imgUrl}
            alt="underwaterImg"
          />
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

        {addReview ? (
          <button
            className="visitedContainer_rating_button"
            onClick={() =>
              openModal("addreview", {
                eventId: eventId,
                title: title,
                onSubmit: () => {
                  console.log("Review submitted here...");
                },
              })
            }
          >
            Rate this event
          </button>
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
