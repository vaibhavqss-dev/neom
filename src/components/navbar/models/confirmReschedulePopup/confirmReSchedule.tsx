import React from "react";
import { useNavigate } from "react-router-dom";

type ReschedulePopupProps = {
  open: boolean;
  name: string;
  eventId: string;
  onClose?: () => void;
};

const ConfirmReSchedule: React.FC<ReschedulePopupProps> = (props) => {
  const { open, name = "Vaibhav", onClose } = props;
  const navigate = useNavigate();

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose();
    navigate(`/rescheduled-event?eventId=${props.eventId}`);
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
            onClick={(e) => onConfirm(e)}
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
