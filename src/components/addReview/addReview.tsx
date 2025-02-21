import ReviewStar from "../base/reviewStar/reviewStar";

export default function AddReview({
  starLen = 0,
  eventCompleted = false,
}: {
  starLen?: number;
  eventCompleted?: boolean;
}) {
  return (
    <div className="addReview">
      <div className="addReviewPg">
        <h1 className="addReviewPg_heading">Add a review</h1>
        <p className="addReviewPg_description">
          Hi Vaibhav, if you're here on this page, we bet you enjoy this event
          fully. Would you mind to share your valuable feedback review with us?
        </p>

        <div className="addReviewPg_star">
          <div className="addReviewPg_star_left">
            <div className="addReviewPg_star_left_qualityOfEvent">
              <p className="addReviewPg_star_left_quality_heading">
                Quality of Event
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar rate={2} />
              </div>
            </div>
            <div className="addReviewPg_star_left_facilitiesOfEvent">
              <p className="addReviewPg_star_left_quality_heading">
                Quality of Event
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar rate={3} />
              </div>
            </div>
            <div className="addReviewPg_star_left_staffPoliteness">
              <p className="addReviewPg_star_left_quality_heading">
                Quality of Event
              </p>
              <div className="addReviewPg_star_left_quality_star">
                <ReviewStar rate={4} />
              </div>
            </div>
          </div>
          <div className="addReviewPg_star_right">
            <div className="addReviewPg_star_right_serviceAtEvent">
              <p className="addReviewPg_left_serviceAtEvent_heading">
                Services at Event
              </p>
              <div className="addReviewPg_left_serviceAtEvent_star">
                <ReviewStar rate={5} />
              </div>
            </div>
            <div className="addReviewPg_star_right_operatorOfEvent">
              <p className="addReviewPg_left_serviceAtEvent_heading">
                Services at Event
              </p>
              <div className="addReviewPg_left_serviceAtEvent_star">
                <ReviewStar rate={3} />
              </div>
            </div>
          </div>
        </div>

        <div className="addReviewPg_feedback">
          <textarea
            className="addReviewPg_feedback_textArea"
            placeholder="Share your feeback and suggestions about this event"
          ></textarea>
        </div>

        <button className="addReviewPg_submitBtn">Submit</button>
      </div>
    </div>
  );
}
