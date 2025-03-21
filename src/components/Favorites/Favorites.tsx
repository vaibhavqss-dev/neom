import React from "react";
import { useEffect, useState } from "react";
import ShortListedCard from "./ShortListedCard/ShortListedCard";
import smileGreenFace from "./../../assets/img/smileGreenFace.svg";
import FavoritesRecommendationSlider from "./recommendation/recommadationSlider";
import Card from "../base/card/card";
import { Likeevent, Unlikeevent } from "../../api/like_event";

type ShortListed = {
  key: string;
  onFavoriteRemove: (index: number) => void;
  imgURL: string;
  name: string;
  category: string;
  date: string;
  time: string;
  face: string;
  event_id: string;
};

const Favorites: React.FC = () => {
  const [ShortListed, setShortListed] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   
  const onFavoriteRemove = (event_id: string) => {
    const isValid = Unlikeevent(event_id);
    setShortListed((prev) => prev.filter((ele) => ele.event_id !== event_id));
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
          `http://localhost:3001/api/user/likeevent`,
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
        setRecommendations(data.events);
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
      event_id: ele.event_id,
      onFavoriteRemove: onFavoriteRemove,
      imgURL: ele.image_urls[0],
      name: ele.title,
      category: ele.category,
      date: ele.date[0],
      time: ele.time[0],
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
        const isLiked = Likeevent(eventId);
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
                key={ele.event_id}
                event_id={ele.event_id}
                index={parseInt(ele.event_id)}
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
