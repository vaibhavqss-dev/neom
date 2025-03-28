import React from "react";
import { useNavigate } from "react-router-dom";
import { notification_delete } from "../../../../api/utility_api";

type ReschedulePopupProps = {
  open: boolean;
  name: string;
  eventId: string;
  onClose?: () => void;
  onConfirms?: () => void;
};

const ConfirmReSchedule: React.FC<ReschedulePopupProps> = (props) => {
  const { open, name = "Vaibhav", onClose, onConfirms } = props;
  // const navigate = useNavigate();

  const onConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose();
    onConfirms && onConfirms();
    // notification_delete(props.eventId);
    // navigate(`/rescheduled-event?eventId=${props.eventId}`);
  };

  const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div className="cancelConfirmationPopup_container">
      <div className="cancelConfirmationPopup">
        <div className="cancelConfirmationPopup_header">
          <h3>Hey {name},</h3>
        </div>
        <div className="cancelConfirmationPopup_body">
          <p>Are you sure, you want to reschedule this event?</p>
        </div>
        <div className="cancelConfirmationPopup_btn">
          <button
            className="cancelConfirmationPopup_btn_yes"
            onClick={(e) => onConfirmClick(e)}
          >
            Yes, I'm sure
          </button>
          <button
            className="cancelConfirmationPopup_btn_no"
            onClick={(e) => onCloseClick(e)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReSchedule;
