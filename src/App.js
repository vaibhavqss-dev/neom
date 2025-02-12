import React from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/HomePage/Home.jsx";
import Favorites from "./components/Favorites/Favorites.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./Router.jsx";
import Error from "./Error.jsx";
import UpcomingEventsPg from "./components/UpcomingEvents/UpcomingEventsPg.jsx";
import EventDetails from "./components/EventDetails/event-details.jsx";
import CancelRecommendation from "./components/cancelRecommendation/cancelRecommendation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Router />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/navbar", element: <Navbar /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/upcoming-events", element: <UpcomingEventsPg /> },
      { path: "/event-details", element: <EventDetails /> },
      { path: "/cancel-recommendation", element: <CancelRecommendation /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
