import React, { useEffect } from "react";
import VibometerIcon from "../vibOmeter/vibometerIcon";
import overwhelmed from "../../assets/img/overwhelmed.svg";
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
document.title = `My Feedback`;

const MyFeedback: React.FC = () => {
  const [Reviews, setReviews] = React.useState<any[]>([]);
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("http://localhost:3001/api/user/review", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (data.error) {
          console.error("API error:", data.error);
          return;
        }

        setReviews(data.reviews);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchReviews();
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
                date={review.event.date}
                city={review.city}
                review={review.comment}
                avg_star={review.avg_star}
                eventId={review.event.event_id}
                name={review.event.title}
                event_date={review.event.date[0]}
                image={review.event.image_urls[0]}
                reviews={review.event.no_reviews}
                rating={review.avg_rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeedback;
