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

  return {
    notifications,
    hasNewNotifications,
    markAsRead,
    clearNotifications,
  };
};
