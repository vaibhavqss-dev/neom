// same as event-details.jsx
// Copy paste the code from event-details.jsx to completedEvents.jsx and add btn
// give feed back
import React from "react";
import EventDetails from "../EventDetails/event-details";

export default function CompletedEvents() {
  return (
    <div className="completedEventsPg">
      <div className="completedEventsPg_addReview">
        <div className="completedEventsPg_addReview_text">
          <p className="completedEventsPg_addReview_text_heading">
            Hey Vaibhav,    
          </p>
          <p className="completedEventsPg_addReview_text_description">
            We are sure that you have enjoyed this event a lot. Would you like
            to share your feedback with us <br />
            It helps us to improve and serve you better.
          </p>
        </div>
        <button className="completedEventsPg_addReview_btn">
          Add a review
        </button>
      </div>

      <EventDetails eventCompleted/>
    </div>
  );
}
