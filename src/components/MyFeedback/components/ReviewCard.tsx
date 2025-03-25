import React from "react";
import EmotionRating from "./EmotionRating";
import { useNavigate } from "react-router-dom";

type ReviewProps = {
  date: string;
  city: string;
  review: string;
  avg_star: number;
  eventId: string;
  name: string;
  event_date: string;
  image: string;
  reviews: string;
  avg_rating: number;
  addReview?: boolean;
};

const ReviewCard: React.FC<ReviewProps> = ({
  date,
  city,
  review,
  avg_star,
  eventId,
  name,
  event_date,
  image,
  reviews,
  avg_rating,
  addReview = false,
}) => {
  const navigate = useNavigate();
  return (
    <div className="review_card">
      <div className="feedback">
        <div
          onClick={() => navigate(`/event-details?eventId=${eventId}`)}
          className="feedback_image"
        >
          <div className="feedback_image_overlay">
            <p className="feedback_image_overlay_text">{name}</p>
            <p className="feedback_image_overlay_date">{event_date}</p>
            <p className="feedback_image_overlay_reviews">{reviews} reviews</p>
          </div>
          <img src={image} alt="profile" />
        </div>
        <div className="feedback_text">
          <p className="feedback_text_date">{date}</p>
          {/* <p className="feedback_text_heading">{city}</p> */}

          {addReview ? (
            <>
              <p>
                Hey {localStorage.getItem("fullname")}, you haven't added you
                feedback yet. Please share your experience with us to serve you
                better next time.
              </p>
              <button
                id="addreviewButton"
                onClick={() => navigate(`/add-review?eventId=${eventId}`)}
              >
                Add Review{" "}
              </button>
            </>
          ) : (
            <>
              <p className="feedback_text_subheading">{review}</p>
              <div className="feedback_text_rating">
                <EmotionRating rating={avg_rating} />
              </div>
            </>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ReviewCard;
