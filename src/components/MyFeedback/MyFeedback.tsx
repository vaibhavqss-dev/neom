import React, { useEffect } from "react";
import VibometerIcon from "../vibOmeter/vibometerIcon";
import overwhelmed from "../../assets/img/overwhelmed.svg";
import desertcity from "../../assets/img/desertcity.jpg";
import ReviewCard from "./components/ReviewCard";

type Review = {
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

const MyFeedback: React.FC = () => {
  const [Reviews, setReviews] = React.useState<Review[]>([]);
  useEffect(() => {
    document.title = `My Feedback`;
    const AllReviews = Array.from({ length: 5 }, (_, i) => {
      return {
        date: "Nov 17, 2022",
        city: "Sindalah City",
        review:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio nulla quasi reiciendis corrupti, necessitatibus itaque molestiae ipsum beatae accusamus explicabo atque vitae, magni illo cum, pariatur quia officia autem perspiciatis!",
        avg_star: i % 7,
        eventId: i.toString(),
        name: "Golf Course",
        event_date: "Nov 17, 2022",
        image: desertcity,
        reviews: "123",
        rating: i % 7,
      };
    });

    setReviews(AllReviews);
  }, []);

  return (
    <div className="myFeedback">
      <div className="myFeedback_firstSection">
        <div className="myFeedback_firstSection_left">
          <img src={overwhelmed} alt="profile" />
          <p className="myFeedback_firstSection_left_category">
            Overwhelmed experience
          </p>
          <p className="myFeedback_firstSection_left_text">
            Your Vibe-O-Meter reading excite us too
          </p>
          <p className="myFeedback_firstSection_left_subtext">
            We are happy too because we successfully keep you happy during this
            visit to Sindalah City.
          </p>
        </div>
        <div className="myFeedback_firstSection_right">
          <VibometerIcon />
        </div>
      </div>

      <div className="myFeedback_secondSectionAlign">
        <div className="myFeedback_secondSection">
          <p className="myFeedback_secondSection_heading">Hi Vaibhav,</p>
          <p className="myFeedback_secondSection_text">
            here are the glimpse of your feedback shared with us.
          </p>

          <div className="myFeedback_secondSection_feedbackContainer">
            {Reviews.map((review, index) => (
              <ReviewCard
                key={index}
                date={review.date}
                city={review.city}
                review={review.review}
                avg_star={review.avg_star}
                eventId={review.eventId}
                name={review.name}
                event_date={review.event_date}
                image={review.image}
                reviews={review.reviews}
                rating={review.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeedback;
