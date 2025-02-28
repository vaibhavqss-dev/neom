import React from "react";
import VibometerIcon from "./vibometerIcon";

const VibOmeter: React.FC = () => {
  const [experience, setExperience] = React.useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setExperience(e.target.value);
  }

  // Effect
  // React.useEffect(() => {

  //   // Send the API Request to the server
  //   console.log(experience);
  // }, []);

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
        <button className="vibometer_submitBtn">Submit</button>
      </div>
    </div>
  );
};

export default VibOmeter;
