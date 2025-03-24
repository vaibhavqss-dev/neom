import React, { useEffect, useState } from "react";
import SelectDistance from "../../selectdistance/selectdistance";
import Card from "../../card/card";

export type FilterState = {
  date: string;
  location: string;
  distance: { type: string; value: number };
  category: string;
  isDistanceApplied: boolean;
  isCategoryApplied: boolean;
};

export type RecommendationLiked = {
  id: string;
  name: string;
};

type RecommendationSectionProps = {};
const RecommendationSection: React.FC<RecommendationSectionProps> = ({}) => {
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleLike(id: string, name: string) {
    setLiked((prev) => {
      if (prev.map((ele) => ele.id).includes(id)) {
        return prev.filter((ele) => ele.id !== id);
      } else {
        return [...prev, { id, name }];
      }
    });
  }

  const [filter, setFilter] = useState<FilterState>({
    date: "",
    location: "",
    distance: { type: "", value: 0 },
    category: "",
    isDistanceApplied: false,
    isCategoryApplied: false,
  });

  function onFilterChange(e: any, filterType: string) {
    if (filterType === "distance" && typeof e === "object") {
      setFilter((prev) => ({
        ...prev,
        distance: e,
        isDistanceApplied: true,
      }));
    } else if (filterType === "category") {
      setFilter((prev) => ({
        ...prev,
        category: e,
        isCategoryApplied: true,
      }));
    } else {
      const value = e.target.value;
      setFilter((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  }

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);

      let url = "http://localhost:3001/api/events";
      const queryParams = [];

      if (filter.category) {
        queryParams.push(`category=${filter.category}`);
      }

      if (filter.location) {
        queryParams.push(`location=${filter.location}`);
      }

      if (filter.date) {
        queryParams.push(`date=${filter.date}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        let filteredEvents = result.data;

        setEvents(filteredEvents);
      } else {
        setEvents([]);
        setError("No events found or invalid response format");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [filter.category, filter.location, filter.date]);

  return (
    <div className="events_similarRecommendation">
      <SelectDistance Filter={filter} setDistance={onFilterChange} />
      <div className="events_similarRecommendation_card">
        {loading ? (
          <span>Loading events...</span>
        ) : error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : events.length ? (
          events.map((ele: any) => (
            <Card
              key={ele.event_id}
              handleLike={handleLike}
              isLiked={liked
                .map((item) => item.id)
                .includes(ele.event_id.toString())}
              eventId={ele.event_id}
              index={ele.event_id}
              imgURL={ele.image_urls[0]}
              subtextDate={ele.date[0]}
              subtextName={ele.subtext || ""}
              name={ele.title}
              timeRange={ele.time[0]}
              location={ele.location}
              category={ele.category}
              date={ele.date}
              time={ele.time}
            />
          ))
        ) : (
          <span style={{ color: "red" }}>No events found for your filters</span>
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
