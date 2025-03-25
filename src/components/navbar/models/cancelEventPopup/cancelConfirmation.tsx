import React from "react";
import { useNavigate } from "react-router-dom";
import { notification_delete } from "../../../../api/utility_api";

type CancelConfirmationPopupProps = {
  open: boolean;
  eventname: string;
  eventId: string;
  onClose?: () => void;
  clearANotification?: (id: string) => void;
};

const CancelConfirmationPopup: React.FC<CancelConfirmationPopupProps> = (
  props
) => {
  const {
    open,
    eventname = "event",
    onClose,
    clearANotification,
    eventId,
  } = props;
  const navigate = useNavigate();

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clearANotification && eventId) {
      console.log(`Clearing notification for event: ${eventId}`);
    }

    notification_delete(eventId);
    onClose && onClose();
    navigate(
      `/cancel-recommendation?eventId=${eventId}&eventname=${eventname}`
    );
  };

  const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose(); // Call the callback when closed without clearing notification
  };

  if (!open) return null; // Don't render anything if not open

  return (
    <div className="cancelConfirmationPopup_container">
      <div className="cancelConfirmationPopup">
        <div className="cancelConfirmationPopup_header">
          <h3>Hey {localStorage.getItem("fullname")},</h3>
        </div>
        <div className="cancelConfirmationPopup_body">
          <p>Are you sure, you want to cancel this event?</p>
        </div>
        <div className="cancelConfirmationPopup_btn">
          <button
            className="cancelConfirmationPopup_btn_yes"
            onClick={onConfirm}
          >
            Yes, I'm sure
          </button>
          <button
            className="cancelConfirmationPopup_btn_no"
            onClick={onCloseClick}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationPopup;
