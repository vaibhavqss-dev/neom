import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
type ReviewCardContainerProps = {
  number?: number;
  id: number;
  reviewsContent: any;
};

type ReviewItem = {
  id: number;
  key: number;
  name: string;
  date: string;
  text: string;
  rating: number;
  profileURL: string;
};

type RecommendationLiked = {
  id: number;
  name: string;
};

const ReviewCardContainer: React.FC<ReviewCardContainerProps> = ({
  id,
  reviewsContent,
}) => {
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);

  function handleLike(id: number, name: string) {
    console.log("Liked", id, name);
    setLiked([...liked, { id, name }]);
  }

  console.log("Liked", reviewsContent);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  useEffect(() => {
    const allReviews = reviewsContent.map((ele: any, i: number) => ({
      id: ele.id,
      key: i,
      name: ele.User.name,
      date: ele.createdAt || "",
      text: ele.comment || "",
      rating: parseInt(ele.avg_rating) || 1,
      profileURL: ele.User.profile_img || "",
    }));
    setReviews(allReviews);
  }, []);

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((ele) => (
          <div className="eventDetailsPg_reviewsCard" key={ele.id}>
            <ReviewCard
              id={ele.id}
              name={ele.name}
              date={ele.date}
              text={ele.text}
              rating={ele.rating}
              profileURL={ele.profileURL}
            />
          </div>
        ))
      ) : (
        <div className="eventDetailsPg_reviewsCard">
          <p>No reviews yet</p>
        </div>
      )}
    </>
  );
};

export default ReviewCardContainer;
