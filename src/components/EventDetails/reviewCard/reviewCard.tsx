import star from "../../../assets/star.svg";
import desertcity from "../../../assets/desertcity.jpg";

export default function ReviewCard() {
  return (
    <div className="reviewCard">
      <div className="reviewCard_user">
        <img className="reviewCard_user_img" src={desertcity} alt="user" />
        <div className="reviewCard_user_text">
          <p className="reviewCard_user_text_name">John Doe</p>
          <p className="reviewCard_user_text_date">Nov 2022</p>
        </div>
      </div>

      <p className="reviewCard_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        vestibulum, mauris sed tincidunt auctor, nunc odio ultricies velit, nec
        luctus dui sem ac dolor. Suspendisse potenti. Sed nec elit vel turpis
        ultricies tempus. Nullam nec ultricies nunc. Nullam nec ultricies nunc.
        Nullam nec ultricies nunc.
      </p>
      <p className="reviewCard_rating">
        {Array(4.9)
          .fill(5)
          .map((_, i) => (
            <img src={star} alt="star" key={i} />
          ))}
      </p>

      <button className="reviewCard_btn">Read More</button>
    </div>
  );
}
