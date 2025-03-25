import { useState, useEffect } from "react";
import { Notification } from "../../../types/notification";
import {
  startNotificationService,
  addNotificationListener,
} from "../../../services/notificationService";
import { notification_delete } from "../../../api/utility_api";

const MAX_NOTIFICATIONS = 1;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    startNotificationService();

    const removeListener = addNotificationListener((notification) => {
      setNotifications((prev) => {
        const updatedNotifications = [notification, ...prev];
        return updatedNotifications.slice(0, MAX_NOTIFICATIONS);
      });
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
    notification_delete((notifications[0] as Notification).id);
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
