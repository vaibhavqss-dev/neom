import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Home from "./components/HomePage/Home";
import Favorites from "./components/Favorites/Favorites";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./Router";
import Error from "./Error";
import UpcomingEventsPg from "./components/UpcomingEvents/UpcomingEventsPg";
import EventDetails from "./components/EventDetails/event-details";
import CancelRecommendation from "./components/cancelRecommendation/cancelRecommendation";
import CompletedEvents from "./components/completedEvents/completedEvents";
import AddReview from "./components/addReview/addReview";
import VibOmeter from "./components/vibOmeter/vibOmeter";
import CancelConfirmationPopup from "./components/utility/cancelConfirmation/cancelConfirmation";
import ConfirmationPopup from "./components/utility/confirmation/confirmationPop";
import ConfirmSchedule from "./components/utility/confirmSchedule/confirmSchedule";
import RescheduledEvent from "./components/rescheduledEvents/rescheduledEvent";
import EditProfile from "./components/editProfile/editProfile";
import EditSetting from "./components/editSetting/editSetting";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Router />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/upcoming-events", element: <UpcomingEventsPg /> },
      // { path: "/event-details", element: <EventDetails /> },
      // { path: "/cancel-recommendation", element: <CancelRecommendation /> },
      // { path: "/completed-events", element: <CompletedEvents /> },
      { path: "/add-review", element: <AddReview /> },
      { path: "/vib-o-meter", element: <VibOmeter /> },
      // { path: "/checking", element: <CancelConfirmationPopup /> },
      // { path: "/checking", element: <ConfirmationPopup /> },
      // { path: "/checking", element: <ConfirmSchedule /> },
      // { path: "/rescheduled-event", element: <RescheduledEvent /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/edit-setting", element: <EditSetting /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
