import React from "react";
import { Notification } from "../../../types/notification";
import bellnofiy from "../../../assets/img/bell-notify.svg";
import { notification_delete } from "../../../api/utility_api";

interface NotificationItemProps {
  notification: any;
  onReschedule: (eventId: string, eventName: string) => void;
  onCancel: (eventId: string, eventName: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onReschedule,
  onCancel,
}) => {
  console.log("notification", notification.message);
  const { message, event_id, event_name, msgid } = notification.message;

  const handleReschedule = () => {
    if (event_id && event_name) {
      onReschedule(event_id, event_name);
    }
  };

  const handleCancel = () => {
    if (event_id && event_name) {
      notification_delete(event_id);
      onCancel(event_id, event_name);
    }
  };

  const renderNotificationContent = () => {
    switch (msgid) {
      case 0:
        return (
          <div className="notification-item">
            <p className="notification_model_title">
              Hey {localStorage.getItem("fullname")}{" "}
              <img src={bellnofiy} alt="bellImg" />
            </p>
            <p className="notification_model_text">{message}</p>
          </div>
        );
      case 1:
        return (
          <div className="notification-item">
            <p className="notification_model_title">
              Hey {localStorage.getItem("fullname")}{" "}
              <img src={bellnofiy} alt="bellImg" />
            </p>
            <p className="notification_model_text">{message}</p>
            <div className="notification_model_btns">
              <button
                className="notification_model_btns_rescheduleBtn"
                onClick={handleReschedule}
              >
                Reschedule
              </button>
              <button
                className="notification_model_btns_cancelBtn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      default:
        return <p className="new_notifications">No New Notification</p>;
    }
  };

  return renderNotificationContent();
};

export default NotificationItem;
