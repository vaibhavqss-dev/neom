import React, { useEffect } from "react";
import VibometerIcon from "./vibometerIcon";
import { post_data } from "../../api/api";
import { useNavigate } from "react-router-dom";

const VibOmeter: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const event_id = query.get("eventId") || "";
  const [experience, setExperience] = React.useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExperience(e.target.value);
  }

  async function sendFeedback() {
    const data  = await post_data("/user/vibometer", {
        vibe: experience,
        event_id: event_id,
      });
      console.log("console.log(data)", data);
      if(data.success){
        navigate("/myfeedback");
      }
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
