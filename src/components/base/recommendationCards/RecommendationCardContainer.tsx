import React, { useEffect, useState } from "react";
import Card from "../card/card";
import yogoImg from "./../../../assets/img/yoga.jpg";

// type RecommendationItem = {
//   event_id: string;
//   category: string;
//   date: string;
//   time: string;
//   name: string;
//   subtextName: string;
//   subtextDate: string;
//   timeRange: string;
//   location: string;
//   imgURL: string;
//   isLiked: boolean;
// };

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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

  const [recommendations, setRecommendations] = useState<any[]>([]);
  useEffect(() => {
    async function fetchItineraries() {
      setLoading(true);
      try {
        const apiUrl = "http://localhost:3001";
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(`${apiUrl}/api/user/recommendation`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          console.error("API error:", data.error);
          return;
        }
        setRecommendations(data.event);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch itineraries");
      } finally {
        setLoading(false);
      }
    }
    fetchItineraries();
  }, []);

  return (
    <div>
      {loading && <p>loading..</p>}
      {error && <p>{}</p>}

      {!error && !loading && (
        <div className="recommendationCardContainer">
          {recommendations.map((ele: any, i: number) => (
            <Card
              IsRank={IsRank}
              key={ele.event_id}
              handleLike={handleLike}
              isLiked={liked.map((item) => item.eventId).includes(ele.event_id)}
              eventId={ele.event_id}
              index={i + 1}
              imgURL={ele.event.image_urls[0]}
              subtextDate={ele.event.date[0]}
              subtextName={ele.event.subtext}
              name={ele.event.title}
              timeRange={ele.event.time[0]}
              location={ele.location}
              category={ele.category}
              date={ele.date}
              time={ele.time}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationCardContainer;
