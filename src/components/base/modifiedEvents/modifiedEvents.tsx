import React, { useEffect, useState } from "react";
import underwater from "../../../assets/img/neom-underwater.jpg";
import { useCountdownTimer } from "./hooks/useCountdownTimer";
import EventMessage from "./components/EventMessage";
import EventDetails from "./components/EventDetails";
import RecommendationSection, {
  FilterState,
  RecommendationLiked,
} from "./components/RecommendationSection";
import { useSearchParams } from "react-router-dom";

type ModifiedBaseEventsProps = {
  name?: string;
  eventName?: string;
  eventLocation?: string;
  eventStartIn?: string;
};

// Define a proper type for the event data
interface SuggestedEvent {
  event_id: number;
  title: string;
  category: string;
  time: string[];
  date: string[];
  location: string;
  image_urls: string[];
}

const ModifiedBaseEvents: React.FC<ModifiedBaseEventsProps> = ({
  name = "Vaibhav",
  eventName = "Under Water",
  eventLocation = "Pune, Maharashtra",
  eventStartIn = "1 hour 5 minutes",
}) => {
  const [searchParams] = useSearchParams();
  const Msgid = parseInt(searchParams.get("id") || "0") % 3;
  const eventname = searchParams.get("eventname") || "Undefined";

  const [suggestLoaded, setSuggestLoaded] = useState(false);
  const [suggestEvents, setSuggestEvents] = useState<SuggestedEvent | null>(
    null
  );
  async function fetchSuggestedEvents() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/event/suggest_event/2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setSuggestEvents(data.event);
      } else {
        console.error("API response was not successful", data);
      }
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setSuggestLoaded(true);
    }
  }

  useEffect(() => {
    fetchSuggestedEvents();
  }, []);

  const eventTimeLeft = useCountdownTimer(
    suggestEvents?.time?.[0]
      ? parseInt(suggestEvents.time[0].split(":")?.[0] || "0")
      : 0,
    suggestEvents?.time?.[0]
      ? parseInt(suggestEvents.time[0].split(":")?.[1] || "0")
      : 0
  );
  return (
    <div className="events">
      {suggestLoaded ? (
        suggestEvents ? (
          <div>
            <EventMessage
              name={localStorage.getItem("fullname") || "User"}
              eventName={eventname}
              messageType={Msgid}
              eventtime={suggestEvents.time[0]}
            />

            <EventDetails
              redirectUrl={`/event-details?eventId=${
                suggestEvents.event_id
              }&eventName=${encodeURIComponent(suggestEvents.title)}`}
              eventName={suggestEvents.title || "Event"}
              eventLocation={suggestEvents.location || "Location not available"}
              // Format time properly or provide fallback
              eventStartIn={
                suggestEvents.time && suggestEvents.time.length > 0
                  ? suggestEvents.time[0]
                  : "Time not specified"
              }
              timeLeft={eventTimeLeft}
              imageUrl={
                suggestEvents.image_urls && suggestEvents.image_urls.length > 0
                  ? suggestEvents.image_urls[0]
                  : underwater
              }
            />
          </div>
        ) : (
          <div>No event data available</div>
        )
      ) : (
        <div>Loading event details...</div>
      )}

      <RecommendationSection />
    </div>
  );
};

export default ModifiedBaseEvents;
