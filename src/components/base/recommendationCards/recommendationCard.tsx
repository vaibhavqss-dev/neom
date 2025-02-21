import desertcity from "../../../assets/desertcity.jpg";

export default function RecommendationCard({ length }: { length: number }) {
  return (
    <div className="recommendationCards">
      {Array.from({ length }).map((_, index) => (
        <div className="recommendationCards_card" key={index}>
          <div className="recommendationCards_card_img_container">
            <img
              src={desertcity}
              alt="Upcoming Events"
              className="recommendationCards_card_img"
            />
          </div>

          <div className="recommendationCards_card_text">
            <div className="recommendationCards_card_text_subtext">
              <p className="recommendationCards_card_text_subtext_name">
                Vibrant & Social
              </p>
              <p className="recommendationCards_card_text_subtext_date">
                Nov 10 - 29
              </p>
            </div>

            <p className="recommendationCards_card_text_name">Round of Golf</p>

            <p className="recommendationCards_card_text_time">
              7:00 AM - 9:00 AM
            </p>
          </div>
          <div className="recommendationCards_card_heart"></div>
        </div>
      ))}
    </div>
  );
}
