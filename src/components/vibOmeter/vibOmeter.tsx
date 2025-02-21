import React from "react";
import VibometerIcon from "./vibometerIcon";

export default function VibOmeter() {
  return (
    <div className="vibometer__container">
      <div className="vibometer">
        <p className="vibometer_heading">Vib-o-meter</p>
        <p className="vibometer_description">
          Hi Vaibhav, we would love know the vibes you got from this event. It
          helps us to improve us and serve you best for the next time.{" "}
        </p>

        <VibometerIcon />

        <div className="vibometer_feedback">
          <textarea
            className="vibometer_feedback_textarea"
            placeholder="Share your experience with us..."
          ></textarea>
        </div>
        <button className="vibometer_submitBtn">Submit</button>
      </div>
    </div>
  );
}
