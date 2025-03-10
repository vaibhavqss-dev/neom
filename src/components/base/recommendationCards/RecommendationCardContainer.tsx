import React, { useEffect, useState } from "react";
import Card from "../card/card";
import yogoImg from "./../../../assets/img/yoga.jpg";

type RecommendationItem = {
  eventId: string;
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
  IsRank?: boolean;
};

type RecommendationLiked = {
  eventId: string;
  name: string;
};

const RecommendationCardContainer: React.FC<
  RecommendationCardContainerProps
> = ({ number, IsRank }) => {
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);

  function handleLike(eventId: string, name: string) {
    setLiked((prev) => {
      if (prev.map((ele) => ele.eventId).includes(eventId)) {
        return prev.filter((ele) => ele.eventId !== eventId);
      } else {
        return [...prev, { eventId, name }];
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
        eventId: i.toString(),
        category: `Category ${i}`,
        date: ` Date ${i}`,
        time: `Time ${i}`,
        name: `Name ${i}`,
        subtextName: `Subtext Name ${i}`,
        subtextDate: `Subtext Date ${i}`,
        timeRange: "Time Range",
        location: "Location",
        imgURL: i & 1 ? "https://picsum.photos/800/600" : yogoImg,
        isLiked: i % 2 === 0,
      }));
    setRecommendations(allRecommendations);
  }, [number]);

  return (
    <div className="recommendationCardContainer">
      {recommendations.map((ele: RecommendationItem, i: number) => (
        <Card
          IsRank={IsRank}
          key={ele.eventId}
          handleLike={handleLike}
          isLiked={liked.map((item) => item.eventId).includes(ele.eventId)}
          eventId={ele.eventId}
          index={parseInt(ele.eventId) + 1}
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
    </div>
  );
};

export default RecommendationCardContainer;
