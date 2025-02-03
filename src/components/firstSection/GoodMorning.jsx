import Corousal from "./corousal/Corousal";
import React from "react";
import Buttons from "../LeftandRightButtons/buttons";
import "./gm.css";

export default function GoodMorning() {
  return (
    <>
      <div className="gmContainer">
        <h1>Good Morning Charlie</h1>
        <p>
          {" "}
          Below listed are your itineraries, have a look to the timing and the
          location{" "}
        </p>
        
        <p> We wish you to enjoy the activities and the weather </p>
        
        <Corousal />
        <Buttons />
        
      </div>
    </>
  );
}
