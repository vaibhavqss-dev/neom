import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
type ReviewCardContainerProps = {
  number?: number;
  id: number;
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

const ReviewCardContainer: React.FC<ReviewCardContainerProps> = ({ id }) => {
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);

  function handleLike(id: number, name: string) {
    console.log("Liked", id, name);
    setLiked([...liked, { id, name }]);
  }

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  useEffect(() => {
    const allReviews = Array(10)
      .fill(3)
      .map((_, i: number) => ({
        id: i,
        key: i,
        name: "Name",
        date: "Date",
        text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam nam nostrum quisquam doloremque temporibus veniam nisi harum eius esse, atque, sed id sequi? Explicabo, aliquid obcaecati earum voluptatum eveniet blanditiis odio maiores!",
        rating: 4,
        profileURL: "https://picsum.photos/800/600",
      }));
    setReviews(allReviews);
  }, [id]);

  return (
    <>
      {reviews.map((ele) => (
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
      ))}
    </>
  );
};

export default ReviewCardContainer;
