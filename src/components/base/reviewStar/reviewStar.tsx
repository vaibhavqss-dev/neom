import starReviewWhite from "./../../../assets/star-review-white.svg";
import starReviewYellow from "./../../../assets/review-star.svg";

export default function ReviewStar({ rate }: { rate: number }) {
  return (
    <div className="reviewStar">
      {Array(5)
        .fill(5)
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
