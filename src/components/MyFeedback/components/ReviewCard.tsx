import React from "react";

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
  rating: number;
};

const ReviewCard: React.FC<ReviewProps> = ({
  date = "Nov 17, 2022",
  city = "Sindalah City",
  review = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio nulla quasi reiciendis corrupti, necessitatibus itaque molestiae ipsum beatae accusamus explicabo atque vitae, magni illo cum, pariatur quia officia autem perspiciatis!",
  avg_star = 4,
  eventId = "1",
  name = "Golf Course",
  event_date = "Nov 17, 2022",
  image = "https://www.google.com",
  reviews = 123,
}) => {
  return (
    <div className="review_card">
      <div className="feedback">
        <div className="feedback_image">
          <div className="feedback_image_overlay">
            <p className="feedback_image_overlay_text">{name}</p>
            <p className="feedback_image_overlay_date">{event_date}</p>
            <p className="feedback_image_overlay_reviews">{reviews} reviews</p>
          </div>
          <img src={image} alt="profile" />
        </div>
        <div className="feedback_text">
          <p className="feedback_text_date">{date}</p>
          <p className="feedback_text_heading">{city}</p>
          <p className="feedback_text_subheading">{review}</p>
          <div className="feedback_text_rating">{avg_star}</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ReviewCard;
