import React, { createContext, useContext, useState, ReactNode } from "react";
type NotificationType = "error" | "warning" | "success" | "info";
interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
 
interface NotificationContextType {
  notifications: Notification[];
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: (id: number) => void;
}
 
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
 
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
 
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [idCounter, setIdCounter] = useState(0);
 
  const showNotification = (
    message: string,
    type: NotificationType = "info"
  ) => {
    const id = idCounter;
    setIdCounter(id + 1);

    const notification = {
      id,
      message,
      type,
    };

    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      hideNotification(id);
    }, 5000);

    return id;
  };

  const hideNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
