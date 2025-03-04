import React, { useEffect, useState } from "react";
import underwater from "../../../assets/neom-underwater.jpg";
import { useCountdownTimer } from "./hooks/useCountdownTimer";
import EventMessage from "./components/EventMessage";
import EventDetails from "./components/EventDetails";
import RecommendationSection, {
  FilterState,
  RecommendationLiked,
} from "./components/RecommendationSection";

type ModifiedBaseEventsProps = {
  name?: string;
  eventName?: string;
  eventLocation?: string;
  eventStartIn?: string;
};

const ModifiedBaseEvents: React.FC<ModifiedBaseEventsProps> = ({
  name = "Vaibhav",
  eventName = "Under Water",
  eventLocation = "Pune, Maharashtra",
  eventStartIn = "1 hour 5 minutes",
}) => {
  const timeLeft = useCountdownTimer(18, 15);
  const [liked, setLiked] = useState<RecommendationLiked[]>([]);

  function handleLike(id: number, name: string) {
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

  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    // Mock event data
    const allEvents = Array(5)
      .fill(15)
      .map((_, index: number) => ({
        id: index,
        imgURL: "https://picsum.photos/800/600",
        subtextDate: "Nov 10 - 29",
        subtextName: "Vibrant & Social",
        name: "Round of Golf",
        timeRange: "7:00 AM - 9:00 AM",
        location: "Delhi",
        category: [
          "Singing",
          "Golf Tournament",
          "Box Cricket",
          "Swimming",
          "Stand Up Comedy",
          "RAMP Walk",
          "Talks Shows",
          "Kite Surfing",
          "Book Exhibitions",
        ][index % 4],
        date: "Nov 10 - 29",
        time: "7:00 AM - 9:00 AM",
        distance: { type: "walking", value: 20 },
      }));

    // Apply filters
    const filteredEvents = allEvents.filter((event) => {
      if (filter.date && filter.date !== event.date) return false;
      if (
        filter.location &&
        !event.location.toLowerCase().includes(filter.location.toLowerCase())
      )
        return false;
      if (filter.category && filter.category !== event.category) return false;
      if (filter.isDistanceApplied) {
        if (filter.distance.value <= event.distance.value) return true;
        return false;
      }
      return true;
    });

    setEvents(filteredEvents);
  }, [filter]);

  return (
    <div className="events">
      <EventMessage name={name} eventName={eventName} messageType={0} />

      <EventDetails
        redirectUrl={`/event-details?eventId=1&eventName=underwaterCity`}
        eventName={eventName}
        eventLocation={eventLocation}
        eventStartIn={eventStartIn}
        timeLeft={timeLeft}
        imageUrl={underwater}
      />

      <RecommendationSection
        filter={filter}
        onFilterChange={onFilterChange}
        events={events}
        liked={liked}
        handleLike={handleLike}
      />
    </div>
  );
};

export default ModifiedBaseEvents;
