import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./Body.css";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
