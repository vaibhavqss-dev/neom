import React from "react";
import { useNavigate } from "react-router-dom";

type CancelConfirmationPopupProps = {
  open?: boolean;
  name?: string;
};

const CancelConfirmationPopup: React.FC<CancelConfirmationPopupProps> = (
  props
) => {
  const { open = true, name = "Vaibhav" } = props;
  const navigate = useNavigate();
  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/`);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/`);
  };

  return (
    <div className="cancelConfirmationPopup_container">
      <div className={`cancelConfirmationPopup ${open ? "open" : ""}`}>
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
            onClick={(e) => onClose(e)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationPopup;
