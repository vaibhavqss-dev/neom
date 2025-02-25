import React, { useState } from "react";

const ConfirmSchedule: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="confirmationSchedulePopup">
        <div className="confirmationSchedulePopup_header">
          <h3>Hey Vaibhav,</h3>
        </div>
        <div className="confirmationSchedulePopup_body">
          <p>Are you sure, you want to reschedule this event?</p>
        </div>
        <div className="confirmationSchedulePopup_btn">
          <button onClick={handleOpen}>Yes, I'm sure</button>
          <button onClick={handleOpen}>No, thanks</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSchedule;
