import React from "react";

const ConfirmationPopup: React.FC = (props: any) => {
  const { open, onClose, onConfirm, title, message } = props;
  
  
  return (
    <div className={`confirmationPopup ${open ? "open" : ""}`}>
      <div className="confirmationPopup_header">
        <h3>Great Charlie,</h3>
      </div>
      <div className="confirmationPopup_body">
        <p>
          You have chosen a new "Round of Golf" event today at 4:40 PM. Have a
          great day ahead and enjoy your new round of golf!
        </p>
      </div>
      <div className="confirmationPopup_btn">
        <button
          onClick={(e) => onConfirm(e)}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
