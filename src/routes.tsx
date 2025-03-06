import React from "react";
import { Routes, Route } from "react-router-dom";
import RescheduledEvent from "./components/rescheduledEvents/rescheduledEvent";
import RescheduledEventPopUp from "./components/rescheduledEvents/reschedulePopUp/reschedulePopup";
// Import other components as needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/rescheduled-events" element={<RescheduledEvent />} />
      <Route path="/reschedule-popup" element={<RescheduledEventPopUp />} />
      {/* Add other routes as needed */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
