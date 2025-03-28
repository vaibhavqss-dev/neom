import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/footer/footer";

const Router: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationToggle = (isOpen: boolean) => {
    setIsNotificationOpen(isOpen);
  };

  const contentStyle = {
    opacity: isNotificationOpen ? 0.7 : 1,
    transition: "opacity 0.3s ease-in-out",
    filter: isNotificationOpen ? "blur(2px)" : "none",
    pointerEvents: isNotificationOpen ? "none" : "auto",
  } as const;

  return (
    <>
      <Navbar isModelOpen={handleNotificationToggle} />
      <div style={contentStyle}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Router;
