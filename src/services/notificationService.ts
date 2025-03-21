import { Notification } from "../types/notification";
import { EventSourcePolyfill } from "event-source-polyfill";

// Use the polyfill type instead of the native EventSource
let eventSource: EventSourcePolyfill | null = null;
const listeners: ((notification: Notification) => void)[] = [];

export const startNotificationService = (): void => {
  if (eventSource) {
    return;
  }

  // Get the token from localStorage or your preferred storage
  const token = localStorage.getItem("authToken");
  eventSource = new EventSourcePolyfill(
    "http://localhost:3001/api/user/notification",
    {
      withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  eventSource.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data) as Notification;
      listeners.forEach((listener) => listener(notification));
    } catch (error) {
      console.error("Error parsing notification:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
    closeConnection();

    // Try to reconnect after 5 seconds
    setTimeout(() => {
      startNotificationService();
    }, 5000);
  };
};

export const closeConnection = (): void => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
};

export const addNotificationListener = (
  callback: (notification: Notification) => void
): (() => void) => {
  listeners.push(callback);

  // Return a function to remove the listener
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};
