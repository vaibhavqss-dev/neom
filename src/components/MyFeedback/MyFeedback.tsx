import React from "react";
import VibometerIcon from "../vibOmeter/vibometerIcon";
import smileGreenFace from "../../assets/smileGreenFace.svg";

const MyFeedback: React.FC = () => {
  return (
    <div className="myFeedback">
      <div className="myFeedback_firstSection">
        <div className="myFeedback_firstSection_left">
          <img src={smileGreenFace} alt="profile" />
          <p className="myFeedback_firstSection_left_category">
            Overwhelmed experience
          </p>
          <p className="myFeedback_firstSection_left_text">
            Your Vibe-O-Meter reading exits us too
          </p>
          <p className="myFeedback_firstSection_left_subtext">
            We are happy too because we successfully keep you happy during this
            visit to Sindalah City.
          </p>
        </div>
        <div className="myFeedback_firstSection_right">
          <VibometerIcon />
        </div>
      </div>

      <div className="myFeedback_secondSection">
        <p className="myFeedback_secondSection_heading">Hi Charlie,</p>
        <p className="myFeedback_secondSection_text">
          here are the glimpse of your feedback shared with us.
        </p>
      </div>
    </div>
  );
};

export default MyFeedback;
