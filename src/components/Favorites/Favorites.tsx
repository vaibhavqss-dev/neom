import React from "react";
import { useEffect, useState, useCallback } from "react";
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

// Generic API fetch function to reduce code duplication
const fetchData = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to fetch data");
  }

  return data;
};

const Favorites: React.FC = () => {
  // State management
  const [ShortListed, setShortListed] = useState<any[]>([]);
  const [liked, setLiked] = useState<{ eventId: string; name: string }[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [TrendingEvents, setTrendingEvents] = useState<any[]>([]);

  // Loading and error states for each API call
  const [likedEventsLoading, setLikedEventsLoading] = useState(false);
  const [trendingEventsLoading, setTrendingEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle like/unlike functionality
  const handleLike = useCallback((eventId: string, name: string) => {
    setLiked((prev) => {
      if (prev.map((ele) => ele.eventId).includes(eventId)) {
        Unlikeevent(eventId.toString());
        return prev.filter((ele) => ele.eventId !== eventId);
      } else {
        Likeevent(eventId.toString());
        return [...prev, { eventId, name }];
      }
    });
  }, []);

  // Handle removing favorite
  const onFavoriteRemove = useCallback((event_id: string) => {
    Unlikeevent(event_id.toString());
    setShortListed((prev) => prev.filter((ele) => ele.event_id !== event_id));
  }, []);

  // Create an adapter function to pass into ShortListedCard (fixing type mismatch)
  const createFavoriteRemoveHandler = useCallback(
    (event_id: string) => {
      return function (index: number) {
        onFavoriteRemove(event_id);
      };
    },
    [onFavoriteRemove]
  );

  // Fetch liked events
  useEffect(() => {
    async function fetchLikedEvents() {
      setLikedEventsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const data = await fetchData(
          "http://localhost:3001/api/user/likeevent",
          token
        );

        setRecommendations(data.events || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch liked events");
      } finally {
        setLikedEventsLoading(false);
      }
    }

    fetchLikedEvents();
  }, []);

  // Process recommendations into ShortListed data
  useEffect(() => {
    const favoritesArray = recommendations.map((ele: any, index) => ({
      key: index.toString(),
      event_id: ele.event_id,
      onFavoriteRemove: createFavoriteRemoveHandler(ele.event_id),
      imgURL: ele.image_urls[0],
      name: ele.title,
      category: ele.category,
      date: ele.date[0],
      time: ele.time[0],
      face: smileGreenFace,
    }));

    setShortListed(favoritesArray);
  }, [recommendations, createFavoriteRemoveHandler]);

  // Fetch trending events
  useEffect(() => {
    async function fetchTrendingEvents() {
      setTrendingEventsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const data = await fetchData(
          "http://localhost:3001/api/events/trending",
          token
        );

        setTrendingEvents(data.events || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch trending events");
      } finally {
        setTrendingEventsLoading(false);
      }
    }

    fetchTrendingEvents();
  }, []);

  // Combined loading state
  const loading = likedEventsLoading || trendingEventsLoading;

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
            {!error && !loading && TrendingEvents.length ? (
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
            ) : (
              <p>No New Trending Events Available now</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
