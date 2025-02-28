import React, { useEffect, useState } from "react";
import RecommendationCard from "./recommendationCard";

type RecommendationItem = {
  id: number;
  category: string;
  date: string;
  time: string;
  name: string;
  subtextName: string;
  subtextDate: string;
  timeRange: string;
  location: string;
  imgURL: string;
  isLiked: boolean;
};

type RecommendationCardContainerProps = {
  number: number;
};

type RecommendationLiked = {
  id: number;
  name: string;
};

const RecommendationCardContainer: React.FC<
  RecommendationCardContainerProps
> = ({ number }) => {
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);

  function handleLike(id: number, name: string) {
    // console.log("Liked", id, name);
    setLiked((prev) => {
      if (prev.map((ele) => ele.id).includes(id)) {
        return prev.filter((ele) => ele.id !== id);
      } else {
        return [...prev, { id, name }];
      }
    });
  }

  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    []
  );

  useEffect(() => {
    const allRecommendations = Array(number)
      .fill(number)
      .map((_, i: number) => ({
        id: i,
        category: "Category",
        date: "Date",
        time: "Time",
        name: "Name",
        subtextName: "Subtext Name",
        subtextDate: "Subtext Date",
        timeRange: "Time Range",
        location: "Location",
        imgURL: "https://picsum.photos/800/600",
        isLiked: i % 2 === 0,
      }));
    setRecommendations(allRecommendations);
  }, [number]);

  return (
    <>
      {recommendations.map((ele: RecommendationItem, i: number) => (
        <RecommendationCard
          key={ele.id}
          handleLike={handleLike}
          isLiked={liked.map((item) => item.id).includes(ele.id)}
          id={ele.id}
          index={ele.id}
          imgURL={ele.imgURL}
          subtextDate={ele.subtextDate}
          subtextName={ele.subtextName}
          name={ele.name}
          timeRange={ele.timeRange}
          location={ele.location}
          category={ele.category}
          date={ele.date}
          time={ele.time}
        />
      ))}
    </>
  );
};

export default RecommendationCardContainer;
