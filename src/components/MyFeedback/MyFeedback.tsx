import React, { useEffect, useState } from "react";
import VibometerIcon from "../vibOmeter/vibometerIcon";
import overwhelmed from "../../assets/img/overwhelmed.svg";
import ReviewCard from "./components/ReviewCard";

type EventReview = {
  id: number;
  quality_of_event: number;
  service_of_event: number;
  facilites_of_event: number;
  staffPoliteness: number;
  operator_of_event: number;
  user_id: number;
  comment: string;
  avg_rating: number;
  date: string;
  time: string;
  event_id: number;
  createdAt: string;
  updatedAt: string;
};

type Event = {
  event_id: number;
  title: string;
  location: string;
  category: string;
  date: string[];
  description: string;
  image_urls: string[];
  subtext: string;
  avg_rating: string;
  no_reviews: string;
  reviews: EventReview[];
};

type BookingWithEvent = {
  id: number;
  user_id: number;
  date_from: string;
  date_to: string;
  time: string | null;
  no_of_guest: number;
  event_id: number;
  createdAt: string;
  updatedAt: string;
  event: Event;
};

document.title = `My Feedback`;

const MyFeedback: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

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

        setReviews(data.event);
        console.log("Reviews", data.event);
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
          <p className="myFeedback_secondSection_heading">
            Hi {localStorage.getItem("fullname")},
          </p>
          <p className="myFeedback_secondSection_text">
            here are the glimpse of your feedback shared with us.
          </p>

          <div className="myFeedback_secondSection_feedbackContainer">
            {reviews.map((booking, index) => {
              const hasReview = booking.event.reviews.length > 0;
              const review = hasReview ? booking.event.reviews[0] : null;

              return (
                <ReviewCard
                  key={index}
                  addReview={!hasReview}
                  date={hasReview ? review?.date.split("T")[0] || "" : ""}
                  city={booking.event.location}
                  review={hasReview ? review?.comment || "" : ""}
                  avg_star={hasReview ? review?.avg_rating || 0 : 0}
                  eventId={booking.event.event_id.toString()}
                  name={booking.event.title}
                  event_date={booking.date_from.split("T")[0] || ""}
                  image={booking.event.image_urls[0]}
                  reviews={booking.event.no_reviews}
                  avg_rating={
                    hasReview
                      ? parseInt(booking.event.reviews[0].avg_rating)
                      : 0
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeedback;
