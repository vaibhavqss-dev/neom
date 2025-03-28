import React from "react";
import { useNotification } from "../context/NotificationContext";

export const NotificationDisplay: React.FC = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <div
      className="notification-container"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999, // Increased z-index to ensure visibility
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          style={{
            padding: "12px 20px",
            marginBottom: "10px",
            borderRadius: "4px",
            backgroundColor:
              notification.type === "error"
                ? "#ffebee"
                : notification.type === "warning"
                ? "#fff8e1"
                : notification.type === "success"
                ? "#e8f5e9"
                : "#e3f2fd",
            color:
              notification.type === "error"
                ? "#d32f2f"
                : notification.type === "warning"
                ? "#ff8f00"
                : notification.type === "success"
                ? "#388e3c"
                : "#1976d2",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            position: "relative",
            minWidth: "250px",
            maxWidth: "400px",
          }}
        >
          <button
            onClick={() => hideNotification(notification.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            &times;
          </button>
          <p style={{ margin: 0 }}>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};
