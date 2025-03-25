import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Router from "./Router";
import Error from "./Error/Error";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/user_auth/login/login";
import Signup from "./components/user_auth/signup/signup";

const Home = lazy(() => import("./components/HomePage/Home"));
const Favorites = lazy(() => import("./components/Favorites/Favorites"));
const UpcomingEventsPg = lazy(
  () => import("./components/UpcomingEvents/UpcomingEventsPg")
);
const EventDetails = lazy(
  () => import("./components/EventDetails/event-details")
);
const CancelRecommendation = lazy(
  () => import("./components/cancelRecommendation/cancelRecommendation")
);
const CompletedEvents = lazy(
  () => import("./components/completedEvents/completedEvents")
);
const AddReview = lazy(() => import("./components/addReview/addReview"));
const VibOmeter = lazy(() => import("./components/vibOmeter/vibOmeter"));
const RescheduledEvent = lazy(
  () => import("./components/rescheduledEvents/rescheduledEvent")
);
const EditProfile = lazy(() => import("./components/editProfile/editProfile"));
const EditSetting = lazy(() => import("./components/editSetting/editSetting"));
const MyFeedback = lazy(() => import("./components/MyFeedback/MyFeedback"));
const RescheduledEventPopUp = lazy(
  () => import("./components/rescheduledEvents/reschedulePopUp/reschedulePopup")
);

const LoadingComponent = () => <div>Loading...</div>;

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/upcoming-events", element: <UpcomingEventsPg /> },
  { path: "/event-details", element: <EventDetails /> },
  { path: "/completed-events", element: <CompletedEvents /> },
  { path: "/cancel-recommendation", element: <CancelRecommendation /> },
  { path: "/rescheduled-event", element: <RescheduledEvent /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/edit-setting", element: <EditSetting /> },
  { path: "/add-review", element: <AddReview /> },
  { path: "/myfeedback", element: <MyFeedback /> },
  { path: "/reschedule-popup", element: <RescheduledEventPopUp /> },
  { path: "/vib-o-meter", element: <VibOmeter /> },
];

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Router />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        element: <ProtectedRoute />,
        children: protectedRoutes.map((route) => ({
          ...route,
          element: (
            <Suspense fallback={<LoadingComponent />}>{route.element}</Suspense>
          ),
        })),
      },
    ],
  },
]);
