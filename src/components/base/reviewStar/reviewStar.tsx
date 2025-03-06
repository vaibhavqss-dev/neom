import starReviewWhite from "./../../../assets/img/star-review-white.svg";
import starReviewYellow from "./../../../assets/img/review-star.svg";

// handleStarChange
type ReviewStarProps = {
  rate: number;
  name: string;
  handleStarChange: (key: string, value: number) => void;
};

const ReviewStar: React.FC<ReviewStarProps> = ({
  name,
  rate,
  handleStarChange,
}) => {
  return (
    <div className="reviewStar">
      {Array(5)
        .fill(5)
        .map((_, i) => (
          <img
            onClick={() => handleStarChange(name, i + 1)}
            key={i}
            src={i + 1 <= rate ? starReviewYellow : starReviewWhite}
            alt="star"
            className="reviewStar_star"
          />
        ))}
    </div>
  );
};

export default ReviewStar;
