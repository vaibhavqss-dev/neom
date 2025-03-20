import React from "react";
import { useEffect, useState } from "react";
import ShortListedCard from "./ShortListedCard/ShortListedCard";
import smileGreenFace from "./../../assets/img/smileGreenFace.svg";
import FavoritesRecommendationSlider from "./recommendation/recommadationSlider";
import Card from "../base/card/card";

type ShortListed = {
  key: string;
  eventid: string;
  onFavoriteRemove: (index: number) => void;
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
};
const Favorites: React.FC = () => {
  const [ShortListed, setShortListed] = useState<ShortListed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFavoriteRemove = (index: number) => {
    setShortListed((prev) =>
      prev.filter((ele) => parseInt(ele.key as string) !== index)
    );
  };

  const [recommendations, setRecommendations] = useState<any[]>([]);
  useEffect(() => {
    async function fetchItineraries() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/user/reserveevent`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          console.error("API error:", data.error);
          return;
        }
        setRecommendations(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch itineraries");
      } finally {
        setLoading(false);
      }
    }
    fetchItineraries();
  }, []);

  useEffect(() => {
    const favoritesArray = recommendations.map((ele: any, index) => ({
      key: index.toString(),
      eventid: ele.event_id,
      onFavoriteRemove: onFavoriteRemove,
      imgURL: ele.event.image_urls[0],
      name: ele.event.title,
      category: ele.event.category,
      date: ele.event.date[0],
      time: ele.event.time[0],
      face: smileGreenFace,
    }));

    setShortListed(favoritesArray);
  }, [recommendations]);

  const [liked, setLiked] = useState<any[]>([]);
  function handleLike(eventId: string, name: string) {
    setLiked((prev) => {
      if (prev.map((ele) => ele.eventId).includes(eventId)) {
        return prev.filter((ele) => ele.eventId !== eventId);
      } else {
        return [...prev, { eventId, name }];
      }
    });
  }

  const [TrendingEvents, setTrendingEvents] = useState<any[]>([]);
  useEffect(() => {
    async function fetchTrendingEvents() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/events/trending`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          console.error("API error:", data.error);
          return;
        }
        setTrendingEvents(data.events);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch itineraries");
      } finally {
        setLoading(false);
      }
    }
    fetchTrendingEvents();
  }, []);

  return (
    <>
      <div className="favoritesPg">
        <p className="favoritesPg_greet">Good Morning Vaibhav!</p>
        <p className="favoritesPg_description">
          You have short listed 8 events to join later
        </p>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // height: "100vh",
              color: "red",
            }}
          >
            Loading...
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="favoritesPg_container">
            {ShortListed.map((ele: ShortListed) => (
              <ShortListedCard
                key={ele.key}
                index={parseInt(ele.key)}
                onFavoriteRemove={ele.onFavoriteRemove}
                imgURL={ele.imgURL}
                name={ele.name}
                category={ele.category}
                date={ele.date}
                time={ele.time}
                face={ele.face}
              />
            ))}
          </div>
        )}

        <FavoritesRecommendationSlider />

        <div className="favoritesPgRecommandation_section">
          <p className="favoritesPgRecommandation_section-title">
            Top 5 activities on this Island today
          </p>

          <div className="favoritesPgRecommandation_section-slider">
            {!error && !loading && (
              <div className="recommendationCardContainer">
                {TrendingEvents.map((ele: any, i: number) => (
                  <Card
                    key={ele.event_id}
                    handleLike={handleLike}
                    isLiked={liked
                      .map((item) => item.eventId)
                      .includes(ele.event_id)}
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
        </div>
      </div>
    </>
  );
};

export default Favorites;
