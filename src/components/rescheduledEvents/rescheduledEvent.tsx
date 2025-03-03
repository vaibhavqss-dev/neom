import React, { useEffect } from "react";
import desertcity from "../../assets/desertcity.jpg";
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

  useEffect(() => {
    // Fetch event details using eventId
  }, [eventId]);

  return (
    <div className="rescheduledEventPg">
      <div className="rescheduledEventPg_headers">
        <h1>Hey Vaibhav,</h1>
        <p>
          We have a few similar event for you against your today's rescheduled
          event of "Round of Golf". And one of them is just starting in an{" "}
          {EventDummyDate.timeLeft} minutes drive away.
        </p>
      </div>

      <div className="rescheduledEventPg_imgContainer">
        <img src={desertcity} alt="event" />

        <div className="rescheduledEventPg_imgContainer_overlay">
          <div className="rescheduledEventPg_imgContainer_overlay_text">
            <h1>{EventDummyDate.name}</h1>
            <p>{EventDummyDate.location}</p>
            <p className="rescheduledEventPg_imgContainer_overlay_text_timeSlots">
              <p>{EventDummyDate.date}</p>
              {EventDummyDate.timeSlots.map((timeSlot, index) => (
                <React.Fragment key={index}>
                  <span>{timeSlot}</span>
                  {index < EventDummyDate.timeSlots.length - 1 && (
                    <span> | </span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          <button
            className="rescheduledEventPg_imgContainer_overlay_btn"
            onClick={() => {
              // Redirect to event details page
              // Add this at the top of your component

              // Then replace the placeholder with:
              navigate(
                `/checking?eventId=${
                  EventDummyDate.eventId || ""
                }&eventName=${encodeURIComponent(
                  EventDummyDate.name
                )}&eventday=${EventDummyDate.date}&eventTime=${
                  EventDummyDate.timeSlots[0]
                }`
              );
            }}
          >
            Reschedule
          </button>
        </div>
      </div>

      <div className="rescheduledEventPg_recommendation">
        <p className="rescheduledEventPg_recommendation_text">
          Some similar recommendation for you, Vaibhav.
        </p>
        <SelectDistance />
        <RecommendationCardContainer number={10} />
      </div>
    </div>
  );
};

export default RescheduledEvent;
