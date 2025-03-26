import React, { useEffect, useState, useCallback, useMemo } from "react";
import ShortListedCard from "./ShortListedCard/ShortListedCard";
import smileGreenFace from "./../../assets/img/smileGreenFace.svg";
import FavoritesRecommendationSlider from "./recommendation/recommadationSlider";
import Card from "../base/card/card";
import { Likeevent, Unlikeevent } from "../../api/utility_api";
import { get_data } from "../../api/api";

// Improved type definitions
type ShortListedItem = {
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

type LikedItem = {
  eventId: string;
  name: string;
};

const Favorites: React.FC = () => {
  // State declarations with proper types
  const [shortListed, setShortListed] = useState<ShortListedItem[]>([]);
  const [liked, setLiked] = useState<LikedItem[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<any[]>([]);

  const [likedEventsLoading, setLikedEventsLoading] = useState(false);
  const [trendingEventsLoading, setTrendingEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized values
  const loading = useMemo(
    () => likedEventsLoading || trendingEventsLoading,
    [likedEventsLoading, trendingEventsLoading]
  );

  // Memoized liked event IDs for faster lookups
  const likedEventIds = useMemo(
    () => new Set(liked.map((item) => item.eventId)),
    [liked]
  );

  // Extracted API functions
  const fetchLikedEvents = useCallback(async () => {
    setLikedEventsLoading(true);
    try {
      const data = await get_data("/user/likeevent");
      setRecommendations(data.events || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch liked events");
    } finally {
      setLikedEventsLoading(false);
    }
  }, []);

  const fetchTrendingEvents = useCallback(async () => {
    setTrendingEventsLoading(true);
    try {
      const data = await get_data("/events/trending");
      setTrendingEvents(data.events || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch trending events");
    } finally {
      setTrendingEventsLoading(false);
    }
  }, []);

  // Optimized callbacks
  const onFavoriteRemove = useCallback((event_id: string) => {
    Unlikeevent(event_id.toString());
    setShortListed((prev) => prev.filter((ele) => ele.event_id !== event_id));
    setLiked((prev) => prev.filter((ele) => ele.eventId !== event_id));
  }, []);

  const createFavoriteRemoveHandler = useCallback(
    (event_id: string) => (index: number) => onFavoriteRemove(event_id),
    [onFavoriteRemove]
  );

  const handleLike = useCallback(
    (eventId: string, name: string) => {
      const isLiked = likedEventIds.has(eventId);

      if (isLiked) {
        // Unlike event
        Unlikeevent(eventId.toString());
        setShortListed((prev) =>
          prev.filter((item) => item.event_id !== eventId)
        );
        setLiked((prev) => prev.filter((ele) => ele.eventId !== eventId));
      } else {
        // Like event - optimistic UI update then refresh
        Likeevent(eventId.toString()).then(fetchLikedEvents);
        setLiked((prev) => [...prev, { eventId, name }]);
      }
    },
    [likedEventIds, fetchLikedEvents]
  );

  // Process recommendations into shortlisted items
  useEffect(() => {
    if (!recommendations.length) return;

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
    setLiked(
      favoritesArray.map((item) => ({
        eventId: item.event_id,
        name: item.name,
      }))
    );
  }, [recommendations, createFavoriteRemoveHandler]);

  // Initial data fetch
  useEffect(() => {
    fetchLikedEvents();
    fetchTrendingEvents();
  }, [fetchLikedEvents, fetchTrendingEvents]);

  // Memoized UI for cards
  const shortListedCards = useMemo(() => {
    if (loading)
      return (
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
      );

    if (error) return <div>Error: {error}</div>;

    return (
      <div className="favoritesPg_container">
        {shortListed.map((ele) => (
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
    );
  }, [shortListed, loading, error]);

  // Memoized trending events cards
  const trendingEventCards = useMemo(() => {
    if (error || loading || !trendingEvents.length) {
      return <p>No New Trending Events Available now</p>;
    }

    return (
      <div className="recommendationCardContainer">
        {trendingEvents.map((ele, i) => (
          <Card
            key={ele.event_id}
            handleLike={handleLike}
            isLiked={likedEventIds.has(ele.event_id)}
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
    );
  }, [trendingEvents, loading, error, handleLike, likedEventIds]);

  return (
    <>
      <div className="favoritesPg">
        <p className="favoritesPg_greet">
          Good Morning {localStorage.getItem("fullname")}
        </p>

        {shortListed.length === 0 ? (
          <p className="favoritesPg_description">
            You have not short listed any events yet, click on heart icon to get
            started
          </p>
        ) : (
          <p className="favoritesPg_description">
            You have short listed {shortListed.length} events to join later
          </p>
        )}

        {shortListedCards}

        <FavoritesRecommendationSlider />

        <div className="favoritesPgRecommandation_section">
          <p className="favoritesPgRecommandation_section-title">
            Top 5 activities on this Island today
          </p>

          <div className="favoritesPgRecommandation_section-slider">
            {trendingEventCards}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Favorites);
