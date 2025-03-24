import { useState, useEffect } from "react";
import { Notification } from "../types/notification";
import {
  startNotificationService,
  addNotificationListener,
} from "../services/notificationService";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    startNotificationService();

    const removeListener = addNotificationListener((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setHasNewNotifications(true);
    });
      
    return () => {
      removeListener();
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setHasNewNotifications(false);
  };
   
  const clearNotifications = () => {
    setNotifications([]);
    setHasNewNotifications(false);
  };
   
  const clearANotification = (id: string) => {
    console.log("clearing notification with id: ", id);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return {
    notifications,
    hasNewNotifications,
    markAsRead,
    clearNotifications,
    clearANotification,
  };
};
