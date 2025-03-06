import React from "react";
import "./App.css";
import Home from "./components/HomePage/Home";
import Favorites from "./components/Favorites/Favorites";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./Router";
import Error from "./Error/Error";
import UpcomingEventsPg from "./components/UpcomingEvents/UpcomingEventsPg";
import EventDetails from "./components/EventDetails/event-details";
import CancelRecommendation from "./components/cancelRecommendation/cancelRecommendation";
import CompletedEvents from "./components/completedEvents/completedEvents";
import AddReview from "./components/addReview/addReview";
import VibOmeter from "./components/vibOmeter/vibOmeter";
import CancelConfirmationPopup from "./components/navbar/models/cancelEventPopup/cancelConfirmation";
import ConfirmationPopup from "./components/utility/confirmation/confirmationPop";
import ConfirmSchedule from "./components/navbar/models/confirmReschedulePopup/confirmReSchedule";
import RescheduledEvent from "./components/rescheduledEvents/rescheduledEvent";
import EditProfile from "./components/editProfile/editProfile";
import EditSetting from "./components/editSetting/editSetting";
import Checkout from "./components/Checkout/Checkout";
import MyFeedback from "./components/MyFeedback/MyFeedback";
import RescheduledEventPopUp from "./components/rescheduledEvents/reschedulePopUp/reschedulePopup";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Router />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/upcoming-events", element: <UpcomingEventsPg /> },
      { path: "/event-details", element: <EventDetails /> },
      { path: "/completed-events", element: <CompletedEvents /> },
      { path: "/cancel-recommendation", element: <CancelRecommendation /> },
      { path: "/rescheduled-event", element: <RescheduledEvent /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/edit-setting", element: <EditSetting /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/add-review", element: <AddReview /> },
      { path: "/myfeedback", element: <MyFeedback /> },
      { path: "/reschedule-popup", element: <RescheduledEventPopUp /> },
      { path: "/vib-o-meter", element: <VibOmeter /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
