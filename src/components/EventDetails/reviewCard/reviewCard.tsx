import star from "../../../assets/img/star.svg";
import desertcity from "../../../assets/img/desertcity.jpg";

type ReviewCardProps = {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
  profileURL: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  name,
  date,
  text,
  rating,
  profileURL,
}) => {
  return (
    <div className="reviewCard">
      <div className="reviewCard_user">
        <img
          className="reviewCard_user_img"
          src={profileURL}
          alt="user"
        />
        <div className="reviewCard_user_text">
          <p className="reviewCard_user_text_name">{name}</p>
          <p className="reviewCard_user_text_date">{date}</p>
        </div>
      </div>

      <p className="reviewCard_text">{text}</p>
      <p className="reviewCard_rating">
        {Array(rating)
          .fill(rating)
          .map((_, i) => (
            <img src={star} alt="star" key={i} />
          ))}
      </p>

      <button className="reviewCard_btn">Read More</button>
    </div>
  );
};

export default ReviewCard;
