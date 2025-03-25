import ReviewStar from "../base/reviewStar/reviewStar";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { post_data } from "../../api/api";

type AddReviewProps = {

};

const AddReview: React.FC<AddReviewProps> = () => {
  const navigate = useNavigate();
  const [star, setStar] = React.useState({
    qualityOfEvent: 0,
    serviceAtEvent: 0,
    facilitiesOfEvent: 0,
    staffPoliteness: 0,
    operatorOfEvent: 0,
  });

  const [feedback, setFeedback] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Check auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No authentication token found. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  function handleStarChange(key: string, value: number) {
    setStar((prev) => ({ ...prev, [key]: value }));
  }

  function handleFeedbackChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(e.target.value);
  }

  const queryParams = new URLSearchParams(window.location.search);
  const eventId = queryParams.get("eventId");
  console.log("EventId from query parameters:", eventId);

  async function addReview() {
    if (
      star.qualityOfEvent === 0 ||
      star.serviceAtEvent === 0 ||
      star.facilitiesOfEvent === 0 ||
      star.staffPoliteness === 0 ||
      star.operatorOfEvent === 0 ||
      feedback.trim() === ""
    ) {
      setSubmitError("Please fill all the fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setSubmitError("Please log in to submit a review");
        navigate("/login");
        return;
      }

      console.log(
        "Submitting review with token:",
        token.substring(0, 10) + "..."
      );

      const data= await post_data(
        `/user/review`,
        {
            quality_of_event: star.qualityOfEvent,
            service_of_event: star.serviceAtEvent,
            facilites_of_event: star.facilitiesOfEvent,
            staffPoliteness: star.staffPoliteness,
            operator_of_event: star.operatorOfEvent,
            comment: feedback,
            event_id: eventId,
        }
      );
      if (data.success) {
        alert("Review added successfully");
        navigate(`/vib-o-meter?eventId=${eventId}`);
      } else {
        setSubmitError(data.message || "Failed to add review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setSubmitError("An error occurred while submitting your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSubmit() {
    if (isSubmitting) return;
    addReview();
  }

  return (
    <div className="addReview">
      <div className="addReviewPg">
        <div className="addReviewPg_clsBtn">
          <NavLink to="/myfeedback">
            <button>X</button>
          </NavLink>
        </div>
        <h1 className="addReviewPg_heading">Add a review</h1>
        <p className="addReviewPg_description">
          Hi {localStorage.getItem("fullname")}, If you're here on this page, we
          bet you enjoy this event fully. Would you mind to share your valuable
          feedback review with us?
        </p>

        <div className="addReviewPg_star">
          <div className="addReviewPg_star_left">
            <div className="addReviewPg_star_left_qualityOfEvent">
              <p className="addReviewPg_star_left_quality_heading">
                Quality of Event
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar
                  name="qualityOfEvent"
                  rate={star.qualityOfEvent}
                  handleStarChange={handleStarChange}
                />
              </div>
            </div>
            <div className="addReviewPg_star_left_facilitiesOfEvent">
              <p className="addReviewPg_star_left_quality_heading">
                Facilities of Event
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar
                  name="facilitiesOfEvent"
                  rate={star.facilitiesOfEvent}
                  handleStarChange={handleStarChange}
                />
              </div>
            </div>
            <div className="addReviewPg_star_left_staffPoliteness">
              <p className="addReviewPg_star_left_quality_heading">
                Staff Politeness
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar
                  name="staffPoliteness"
                  rate={star.staffPoliteness}
                  handleStarChange={handleStarChange}
                />
              </div>
            </div>
          </div>
          <div className="addReviewPg_star_right">
            <div className="addReviewPg_star_right_serviceAtEvent">
              <p className="addReviewPg_left_serviceAtEvent_heading">
                Services at Event
              </p>
              <div className="addReviewPg_left_serviceAtEvent_star">
                <ReviewStar
                  name="serviceAtEvent"
                  rate={star.serviceAtEvent}
                  handleStarChange={handleStarChange}
                />
              </div>
            </div>
            <div className="addReviewPg_star_right_operatorOfEvent">
              <p className="addReviewPg_left_serviceAtEvent_heading">
                Operator of Event
              </p>
              <div className="addReviewPg_left_serviceAtEvent_star">
                <ReviewStar
                  name="operatorOfEvent"
                  rate={star.operatorOfEvent}
                  handleStarChange={handleStarChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="addReviewPg_feedback">
          <textarea
            required
            onChange={(e) => handleFeedbackChange(e)}
            className="addReviewPg_feedback_textArea"
            placeholder="Share your feeback and suggestions about this event"
          ></textarea>
        </div>

        {submitError && <div className="addReviewPg_error">{submitError}</div>}

        <button
          onClick={onSubmit}
          className="addReviewPg_submitBtn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
