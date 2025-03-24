import React, { useEffect, useState } from "react";
import SelectDistance from "../base/selectdistance/selectdistance";
import RecommendationCardContainer from "../base/recommendationCards/RecommendationCardContainer";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RescheduledEventProps {}

const EventDummyDate = {
  name: "Round of Golf",
  location: "Sindalah Island",
  date: "Jan 01, 2023",
  timeSlots: ["7:00 AM", "11:00 AM", "3:00 PM"],
  timeLeft: "1 hour 5 minutes",
  eventId: "123",
};

const RescheduledEvent: React.FC<RescheduledEventProps> = ({}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get("eventId");
  const eventName = searchParams.get("eventName");

  const [suggestedEvent, setSuggestedEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [event, setEvent] = useState<any>(null);
  useEffect(() => {
    let isMounted = true;

    async function fetchSuggestedEvent() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/event/suggest_event/2`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();

        if (isMounted) {
          if (response.ok && data.success) {
            setSuggestedEvent(data.event);
          } else {
            console.error("API response was not successful", data);
            setError("Failed to load suggested event");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching suggested event:", err);
          setError("Error connecting to server");
        }
      }
    }

    async function fetchEvent() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/events?event_id=${eventId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        if (isMounted) {
          if (response.ok && data.success) {
            setEvent(data.event);
          } else {
            console.error("API response was not successful", data);
            setError("Failed to load event details");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching event:", err);
          setError("Error connecting to server");
        }
      }
    }

    // Set loading to true before fetching
    setLoading(true);

    // Fetch both data in parallel
    Promise.all([fetchEvent(), fetchSuggestedEvent()]).finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  if (loading) {
    return (
      <div className="rescheduledEventPg">Loading suggested events...</div>
    );
  }

  if (error || !suggestedEvent) {
    return (
      <div className="rescheduledEventPg">
        <div className="rescheduledEventPg_headers">
          <h1>Hey {localStorage.getItem("fullname")},</h1>
          <p>
            Sorry, we couldn't find any suggested events at this time. {error}
          </p>
        </div>
      </div>
    );
  }

  // Add a check for event data
  if (!event) {
    return (
      <div className="rescheduledEventPg">
        <div className="rescheduledEventPg_headers">
          <h1>Hey {localStorage.getItem("fullname")},</h1>
          <p>Sorry, we couldn't load the event details at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rescheduledEventPg">
      <>
        <div className="rescheduledEventPg_headers">
          <h1>Hey {localStorage.getItem("fullname")},</h1>
          <p>
            We have a few similar event for you against your today's rescheduled
            event of {event.title}. And one of them is just starting in an{" "}
            {suggestedEvent.time[0].split(":")[0]} hours{" "}
            {suggestedEvent.time[0].split(":")[1]} minutes drive away.
          </p>
        </div>

        <div className="rescheduledEventPg_imgContainer">
          <img src={event.image_urls[0]} alt="event" />

          <div className="rescheduledEventPg_imgContainer_overlay">
            <div className="rescheduledEventPg_imgContainer_overlay_text">
              <h1>{event.title}</h1>
              <p>{event.location}</p>
              <p className="rescheduledEventPg_imgContainer_overlay_text_timeSlots">
                <p>{event.date.map((date:any) => " | " + date)}</p>
                {event.time.map((timeSlot: any, index: number) => (
                  
                  <div key={index}>
                    <span>{timeSlot}</span>
                    {/* {index < event.time.length - 1 && <span> | </span>} */}
                  </div>
                ))}
              </p>
            </div>

            <button
              className="rescheduledEventPg_imgContainer_overlay_btn"
              onClick={() => {
                navigate(
                  `/reschedule-popup?eventId=${
                    event.event_id
                  }&eventName=${encodeURIComponent(event.title)}&eventDay=${
                    suggestedEvent.date[0]
                  }&eventTime=${event.time[0]}`
                );
              }}
            >
              Reschedule
            </button>
          </div>
        </div>

        <div className="rescheduledEventPg_recommendation">
          <RecommendationCardContainer number={10} />
        </div>
      </>
    </div>
  );
};

export default RescheduledEvent;
