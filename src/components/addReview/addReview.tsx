import ReviewStar from "../base/reviewStar/reviewStar";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

type AddReviewProps = {
  starLen?: number;
  eventCompleted?: boolean;
  name?: string;
};

const AddReview: React.FC<AddReviewProps> = ({
  starLen = 0,
  eventCompleted = false,
  name = "Vaibhav",
}) => {
  const [star, setStar] = React.useState({
    qualityOfEvent: 0,
    serviceAtEvent: 0,
    facilitiesOfEvent: 0,
    staffPoliteness: 0,
    operatorOfEvent: 0,
  });
  const [feedback, setFeedback] = React.useState("");

  useEffect(() => {
    // fetch api to get the review data
  }, []);

  function handleStarChange(key: string, value: number) {
    setStar((prev) => ({ ...prev, [key]: value }));
  }

  function handleFeedbackChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(e.target.value);
  }

  return (
    <div className="addReview">
      <div className="addReviewPg">
        <div className="addReviewPg_clsBtn">
          <NavLink to="/">
            <button>X</button>
          </NavLink>
        </div>
        <h1 className="addReviewPg_heading">Add a review</h1>
        <p className="addReviewPg_description">
          Hi {name}, If you're here on this page, we bet you enjoy this event
          fully. Would you mind to share your valuable feedback review with us?
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

        <button className="addReviewPg_submitBtn">Submit</button>
      </div>
    </div>
  );
};

export default AddReview;
