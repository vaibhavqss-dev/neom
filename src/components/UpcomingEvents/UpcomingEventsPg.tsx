import React, { JSX, useEffect, useState } from "react";
import Card from "../base/card/card";
import SelectDistance from "../base/selectdistance/selectdistance";
import location from "../../assets/img/location.svg";
import calender from "../../assets/img/calendar.svg";
import {
  formatDateForAPI,
  formatDateForDisplay,
  formatTimeForDisplay,
} from "../../utils/utility";
import { Likeevent, Unlikeevent } from "../../api/like_event";

type FilterState = {
  date: string;
  location: string;
  distance: { type: string; value: number };
  category: string;
  isDistanceApplied: boolean;
  isCategoryApplied: boolean;
};

type likedEvents = {
  id: string;
  name: string;
};

// Event data type from API
type EventData = {
  event_id: number;
  title: string;
  description: string;
  subtext: string;
  date: string[];
  time: string[];
  latitude: string;
  longitude: string;
  category: string;
  location: string;
  image_urls: string[];
  overall_rating: number;
  min_temprature: string;
  max_temprature: string;
  avg_rating: string;
  no_reviews: string;
  createdAt: string;
  updatedAt: string;
};

const UpcomingEventsPg: React.FC = () => {
  const [events, setEvents] = useState<JSX.Element[]>([]);
  const [apiEvents, setApiEvents] = useState<EventData[]>([]);
  const [Filter, setFilter] = useState<FilterState>({
    date: "",
    location: "",
    distance: { type: "", value: 0 },
    category: "",
    isDistanceApplied: false,
    isCategoryApplied: false,
  });

  const [likedEvents, setLikedEvents] = useState<likedEvents[]>([]);
  const [loading, setLoading] = useState(true);

  const neomPlaces = [
    "Neom City, Saudi Arabia",
    "The Line",
    "Trojena",
    "Sindalah Island",
    "OXAGON",
    "Neom Bay",
    "Gulf of Aqaba",
    "NEOM Mountain Resort",
    "NEOM Tech City",
    "The Spine",
    "Port NEOM",
  ];

  const eventCategories = [
    "sports",
    "technology",
    "entertainment",
    "business",
    "adventure",
    "culture",
    "health",
    "food",
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState(neomPlaces);

  function handleLike(id: string, name: string) {
    setLikedEvents((prev) => {
      if (prev.map((ele) => ele.id).includes(id)) {
        Unlikeevent(id);
        return prev.filter((ele) => ele.id !== id);
      } else {
        Likeevent(id);
        return [...prev, { id, name }];
      }
    });
  }

  function onFilterChange(e: any, filterType: string | "distance") {
    if (filterType === "distance" && typeof e === "object") {
      setFilter((prev) => ({
        ...prev,
        distance: e,
        isDistanceApplied: true,
      }));
    } else if (filterType === "category") {
      const categoryValue = e;
      setFilter((prev) => {
        const updatedFilter = {
          ...prev,
          category: categoryValue,
          isCategoryApplied: true,
        };
        fetchEvents(categoryValue, updatedFilter.location, updatedFilter.date);
        return updatedFilter;
      });
    } else {
      const value = e.target.value;
      setFilter((prev) => {
        const updatedFilter = {
          ...prev,
          [filterType]: value,
        };

        if (filterType === "date") {
          fetchEvents(updatedFilter.category, updatedFilter.location, value);
        }
        return updatedFilter;
      });
    }
  }

  function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      location: value,
    }));

    // Filter places based on input
    setFilteredPlaces(
      neomPlaces.filter((place) =>
        place.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  function selectLocation(place: string) {
    setFilter((prev) => {
      const updatedFilter = {
        ...prev,
        location: place,
      };
      fetchEvents(updatedFilter.category, place, updatedFilter.date);
      return updatedFilter;
    });
    setShowDropdown(false);
  }

  async function fetchEvents(category = "", location = "", date = "") {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category.toLowerCase());
      if (location) queryParams.append("location", location);
      if (date) {
        const formattedDate = formatDateForAPI(date);
        queryParams.append("date", formattedDate);
      }

      const url = `http://localhost:3001/api/events?${queryParams.toString()}`;
      console.log("Fetching events from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setApiEvents(result.data);
      } else {
        console.error("Invalid response format or empty data", result);
        setApiEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setApiEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  // Generate cards from API data
  useEffect(() => {
    if (apiEvents && apiEvents.length > 0) {
      try {
        const cards = apiEvents.map((event) => (
          <Card
            isLiked={likedEvents
              .map((item) => item.id)
              .includes(String(event.event_id))}
            eventId={String(event.event_id)}
            handleLike={handleLike}
            key={event.event_id}
            index={event.event_id}
            imgURL={
              event.image_urls && event.image_urls.length > 0
                ? event.image_urls[0]
                : ""
            }
            subtextDate={formatDateForDisplay(event.date)}
            subtextName={event.subtext || ""}
            name={event.title || ""}
            timeRange={formatTimeForDisplay(event.time)}
            location={event.location || ""}
            category={event.category || ""}
            date={formatDateForDisplay(event.date)}
            time={formatTimeForDisplay(event.time)}
          />
        ));
        setEvents(cards);
      } catch (error) {
        console.error("Error generating cards:", error);
        setEvents([]);
      }
    } else {
      setEvents([]);
    }
  }, [apiEvents, likedEvents]);

  return (
    <div className="upcomingEventsPg">
      <h1 className="upcomingEventsPg_heading">Hey Vaibhav,</h1>

      <p className="upcomingEventsPg_subtext">
        Let's find something exciting for you.
      </p>

      <div className="upcomingEventsPg_date_and_distance">
        <div className="upcomingEventsPg_date">
          <p className="upcomingEventsPg_date_text">
            What suits your schedules?
          </p>

          <div className="upcomingEventsPg_dateLocation_btns">
            <div className="upcomingEventsPg_dateLocation_btns_date">
              <img src={calender} alt="calendersvg" />
              <input
                type="date"
                onChange={(e) => onFilterChange(e, "date")}
                className="upcomingEventsPg_dateLocation_btns_dateBtn"
                placeholder="Pick a date"
              />
            </div>

            <div className="upcomingEventsPg_dateLocation_btns_location">
              <img src={location} alt="location" />
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  value={Filter.location}
                  onChange={handleLocationChange}
                  className="upcomingEventsPg_dateLocation_btns_text"
                  placeholder="Pick a location"
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      maxHeight: "200px",
                      overflowY: "auto",
                      background: "white",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      borderRadius: "4px",
                      zIndex: 10,
                    }}
                  >
                    {filteredPlaces.map((place, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                        }}
                        onMouseDown={() => selectLocation(place)}
                        onTouchStart={() => selectLocation(place)}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SelectDistance Filter={Filter} setDistance={onFilterChange} />
      </div>

      <div className="upcomingEventsPg_eventsType">
        <p className="upcomingEventsPg_eventsType_text">
          You can always filter out the events by category wise.
        </p>

        <div className="upcomingEventsPg_eventsType_btns">
          {eventCategories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category, "category")}
              className={
                Filter.category === category
                  ? "upcomingEventsPg_eventsType_btn_active"
                  : "upcomingEventsPg_eventsType_btn"
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="upcomingEventsPg_recommendation">
        {loading ? (
          <div>Loading events...</div>
        ) : events.length === 0 ? (
          <div className="ColorRed">
            No New events found. Try using different filters.
          </div>
        ) : (
          events
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsPg;
