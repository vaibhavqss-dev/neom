import React, { useEffect } from "react";
import VibometerIcon from "./vibometerIcon";

const VibOmeter: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const event_id = query.get("event_id") || "";
  const [experience, setExperience] = React.useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExperience(e.target.value);
  }

  async function sendFeedback() {
    const response = await fetch("http://localhost:3001/api/user/vibometer", {
      method: "POST",
      body: JSON.stringify({
        vibe: experience,
        event_id: event_id,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
  }

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
            value={experience}
            onChange={(e) => handleChange(e)}
            className="vibometer_feedback_textarea"
            placeholder="Share your experience with us..."
          ></textarea>
        </div>
        <button onClick={() => sendFeedback()} className="vibometer_submitBtn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default VibOmeter;
