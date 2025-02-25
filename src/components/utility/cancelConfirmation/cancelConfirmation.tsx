import React from "react";

const CancelConfirmationPopup: React.FC = (props: any) => {
  const { open, onClose, onConfirm, title, message } = props;

  return (
    <div className={`cancelConfirmationPopup ${open ? "open" : ""}`}>
      <div className="cancelConfirmationPopup_header">
        <h3>Hey Vaibhav,</h3>
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
          onClick={(e) => onClose(e)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default CancelConfirmationPopup;
