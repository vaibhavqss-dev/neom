import React from "react";

interface VisitedProps {
  imgUrl: string;
  title: string;
  attented: string | number;
  dateandTime: string;
  rating: number;
}

const Visited: React.FC<VisitedProps> = ({
  imgUrl,
  title,
  attented,
  dateandTime,
  rating,
}) => {
  return (
    <>
      <div className="visitedContainer">
        <div className="visitedContainer_imgContainer">
          <img id="visitedContainer_img" src={imgUrl} alt="underwaterImg" />
        </div>

        <div className="visitedContainer_description">
          <p className="visitedContainer_description_title">{title}</p>
          <p className="visitedContainer_description_attented">
            {attented} guest attented this event
          </p>
          <p className="visitedContainer_description_dateandTime">
            on {dateandTime}
          </p>
        </div>
        <p className="visitedContainer_rating_stars">
          You rated this event
          <span className="visitedContainer_rating_stars_black">
            {Array.from({ length: (rating % 5) + 1 }, (_, index) => (
              <span key={index}>★</span>
            ))}
          </span>
        </p>
      </div>
    </>
  );
};

export default Visited;
