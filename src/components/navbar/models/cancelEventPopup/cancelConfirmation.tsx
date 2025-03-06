import React from "react";
import { useNavigate } from "react-router-dom";

type CancelConfirmationPopupProps = {
  open: boolean;
  name: string;
  eventId: string;
  onClose?: () => void; // Add this new prop for callback
};

const CancelConfirmationPopup: React.FC<CancelConfirmationPopupProps> = (
  props
) => {
  const { open, name = "Vaibhav", onClose } = props;
  const navigate = useNavigate();

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose(); // Call the callback when confirmed
    navigate(`/cancel-recommendation?eventId=${props.eventId}`);
  };

  const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose && onClose(); // Call the callback when closed
    // navigate('/')
  };

  if (!open) return null; // Don't render anything if not open

  return (
    <div className="cancelConfirmationPopup_container">
      <div className="cancelConfirmationPopup">
        <div className="cancelConfirmationPopup_header">
          <h3>Hey {name},</h3>
        </div>
        <div className="cancelConfirmationPopup_body">
          <p>Are you sure, you want to cancel this event?</p>
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

export default CancelConfirmationPopup;
