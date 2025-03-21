import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RescheduledEventPopUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get event details from URL params
  const eventId = searchParams.get("event_id") || "123";
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
    selectedDay: "Jan 1, 2025",
    selectedTimeSlot: "10:00 AM - 3:30 PM",
    selectedSeats: "1 seat",
  });

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

    onChangeEventDay(
      formValues.selectedDay,
      ScheduleEvent.eventId,
      formValues.selectedTimeSlot,
      formValues.selectedSeats
    );
    
    // After updating the event, redirect to upcoming events
    navigate("/cancel-recommendation?id=1", { replace: true });
  };

  return (
    <div className="reschedule-popup-overlay">
      <div className="event-container">
        <div className="event-card">
          <h2>Hey Vaibhav,</h2>
          <p>
            You have chosen a new "{ScheduleEvent.name}" event on{" "}
            {ScheduleEvent.eventDay}, at {ScheduleEvent.timeSlot}. Have a great
            day ahead and enjoy your new round of golf!
          </p>

          <div className="form-group_1">
            <div className="form-group">
              <label>Select a day</label>
              <select value={formValues.selectedDay} onChange={handleDayChange}>
                <option>Jan 1, 2025</option>
                <option>Jan 2, 2025</option>
                <option>Jan 12, 2025</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select a time slot</label>
              <select
                value={formValues.selectedTimeSlot}
                onChange={handleTimeSlotChange}
              >
                <option>10:00 AM - 3:30 PM</option>
                <option>3:30 PM - 10:00 PM</option>
                <option>10:00 PM - 3:30 AM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Select your seats</label>
            <select
              value={formValues.selectedSeats}
              onChange={handleSeatsChange}
            >
              <option>1 seat</option>
              <option>3 seat</option>
              <option>5 seat</option>
            </select>
          </div>

          <div className="button-group">
            <button className="reserve-button" onClick={handleReserve}>
              Reserve my seats
            </button>
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
