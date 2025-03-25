import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get_data, patch_data } from "../../../api/api";

// Define the Event interface to match the API response
interface EventReview {
  comment: string;
  user_id: number;
  avg_rating: number;
  createdAt: string;
  id: number;
  User: {
    name: string;
    email: string;
    profile_img: string;
  };
}

interface Event {
  event_id: number;
  title: string;
  description: string;
  subtext: string;
  date: string[];
  time: string[];
  location: string;
  available_seats: number;
  image_urls: string[];
}

const RescheduledEventPopUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get event details from URL params
  const eventId = searchParams.get("eventId") || "123";
  const eventName = searchParams.get("eventName") || "Round of Golf";
  const eventDay = searchParams.get("eventDay") || "Jan 01, 2023";
  const eventTime = searchParams.get("eventTime") || "12:00 AM";

  const [ScheduleEvent, setScheduleEvent] = React.useState({
    eventId: eventId,
    name: eventName,
    timeSlot: eventTime,
    seats: "1",
    eventDay: eventDay,
  });

  const [formValues, setFormValues] = React.useState({
    selectedDay: "",
    selectedTimeSlot: "",
    selectedSeats: "1 seat",
  });

  const [event, setEvent] = React.useState<Event | undefined>();

  // Format time for display (convert 24-hour to 12-hour format)
  const formatTime = (time: string): string => {
    try {
      // Assuming time is in HH:MM:SS format
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (e) {
      console.error("Error formatting time:", e);
      return time;
    }
  };

  // Generate time slot display from start and end times
  const getTimeSlotDisplay = (startTime: string, endTime?: string): string => {
    if (endTime) {
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }
    return formatTime(startTime);
  };

  const getAvailableTimeSlots = (): string[] => {
    if (!event || !event.time) return [];

    if (event.time.length > 1) {
      const slots = [];
      for (let i = 0; i < event.time.length - 1; i++) {
        slots.push(getTimeSlotDisplay(event.time[i], event.time[i + 1]));
      }
      return slots.length ? slots : [getTimeSlotDisplay(event.time[0])];
    }
    return event.time.map((t) => getTimeSlotDisplay(t));
  };

  const getAvailableSeatsOptions = (): string[] => {
    if (!event || !event.available_seats) return ["1 seat"];

    const options = [];
    const maxOptions = Math.min(5, event.available_seats);

    for (let i = 1; i <= maxOptions; i++) {
      options.push(`${i} seat${i > 1 ? "s" : ""}`);
    }

    return options;
  };

  function onChangeEventDay(
    eventDay: string,
    eventId: string,
    timeSlot: string,
    seats: string
  ) {
    setScheduleEvent((prev) => ({
      ...prev,
      eventDay: eventDay,
      eventId: eventId,
      timeSlot: timeSlot,
      seats: seats,
    }));
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      selectedDay: e.target.value,
    });
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      selectedTimeSlot: e.target.value,
    });
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      selectedSeats: e.target.value,
    });
  };

  const handleReserve = () => {
    if (
      !ScheduleEvent.eventId &&
      !formValues.selectedDay &&
      !formValues.selectedTimeSlot &&
      !formValues.selectedSeats
    ) {
      return;
    }
    const seatsValue = formValues.selectedSeats.split(" ")[0];
    onChangeEventDay(
      formValues.selectedDay,
      ScheduleEvent.eventId,
      formValues.selectedTimeSlot,
      seatsValue
    );

    if (!UpdateEvent()) {
      alert("Event Not Updated");
      return;
    }

  };

  async function getEvent() {
    try {
      const data = await get_data(
        `/events?event_id=${eventId}`,

      );

      console.log("Event data:", data);
      if (data.success) {
        setEvent(data.event);
      } else {
        console.error("API response was not successful", data);
      }
    } catch (err) {
      console.error("Error fetching event:", err);
    }
  }

  async function UpdateEvent() {
    try {
      // Extract number from seats string (e.g., "2 seats" -> "2")
      const seatsNumber = ScheduleEvent.seats.split(" ")[0];

      const data = await patch_data(
        `/user/event/reschedule`,
        {
            event_id: ScheduleEvent.eventId,
            date: ScheduleEvent.eventDay,
            time: ScheduleEvent.timeSlot,
            no_of_guest: seatsNumber,
        }
      );
      if (data.success) {
        console.log("Event updated successfully");
        return true;
      } else {
        console.error("API response was not successful", data);
        return false;
      }
    } catch (err) {
      console.error("Error updating event:", err);
      return false;
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="reschedule-popup-overlay">
      <div className="event-container">
        <div className="event-card">
          <h2>Hey Vaibhav,</h2>
          <p>
            You have chosen a new "{ScheduleEvent.name}".
            {/* event on{" "}
            {ScheduleEvent.eventDay}, at {ScheduleEvent.timeSlot}. 
             */}
            Have a great day ahead and enjoy your new experience!
          </p>

          <div className="form-group_1">
            <div className="form-group">
              <label>Select a day</label>
              <select value={formValues.selectedDay} onChange={handleDayChange}>
                {event &&
                  event.date &&
                  event.date.map((date: string) => (
                    <option key={date}>{date}</option>
                  ))}
                {(!event || !event.date || event.date.length === 0) && (
                  <option>No dates available</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Select a time slot</label>
              <select
                value={formValues.selectedTimeSlot}
                onChange={handleTimeSlotChange}
              >
                {getAvailableTimeSlots().map((slot, index) => (
                  <option key={index}>{slot}</option>
                ))}
                {getAvailableTimeSlots().length === 0 && (
                  <option>No time slots available</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Select your seats</label>
            <select
              value={formValues.selectedSeats}
              onChange={handleSeatsChange}
            >
              {getAvailableSeatsOptions().map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            {getAvailableTimeSlots().length !== 0 && (
              <button className="reserve-button" onClick={handleReserve}>
                Reserve my seats
              </button>
            )}
            <button
              onClick={() => navigate("/upcoming-events", { replace: true })}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduledEventPopUp;
