import starReviewWhite from "./../../../assets/star-review-white.svg";
import starReviewYellow from "./../../../assets/review-star.svg";

export default function ReviewStar({ rate }) {
  return (
    <div className="reviewStar">
      {Array(5)
        .fill()
        .map((_, i) => (
          <img
            src={i + 1 <= rate ? starReviewYellow : starReviewWhite}
            alt="star"
            className="reviewStar_star"
          />
        ))}
    </div>
  );
}
