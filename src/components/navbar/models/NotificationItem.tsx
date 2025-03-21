import React from "react";
import { Notification } from "../../../types/notification";
import bellnofiy from "../../../assets/img/bell-notify.svg";

interface NotificationItemProps {
  notification: Notification;
  onReschedule: (eventId: string, eventName: string) => void;
  onCancel: (eventId: string, eventName: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onReschedule,
  onCancel,
}) => {
  const { message, event_id, event_name, msgid } = notification;

  const handleReschedule = () => {
    if (event_id && event_name) {
      onReschedule(event_id, event_name);
    }
  };

  const handleCancel = () => {
    if (event_id && event_name) {
      onCancel(event_id, event_name);
    }
  };

  return (
    <div className="notification-item">
      <p className="notification_model_title">
        Hey Vaibhav <img src={bellnofiy} alt="bellImg" />
      </p>
      <p className="notification_model_text">{message}</p>

      {msgid === 1 && event_id && event_name && (
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
      )}
    </div>
  );
};

export default NotificationItem;
