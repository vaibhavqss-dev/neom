import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { configureErrorHandler } from "../utils/ApiErrorHandler";
import Navbar from "./navbar/navbar";

type NotificationType = "error" | "warning" | "success" | "info";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    configureErrorHandler({
      navigate,
      loginRedirectPath: "/login",
      showNotification: (message, type) =>
        showNotification(message, type as NotificationType),
    });

    // Optionally show a test notification to verify it's working
    // showNotification("Notification system initialized", "info");
  }, [navigate, showNotification]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
