import React from "react";
import "./Corousal.css";
import underwaterImg from "../../../assets/neom-underwater.jpg"

export default function Corousal() {
  return (
    <div className="corousalContainer">
        <div className="imgContainer">
            <img src={underwaterImg} alt="underwater" />
        </div>

        <div className="textContainer">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, repellat sit 
            consequatur ut reiciendis ducimus quod inventore consectetur et, iste soluta, quam accusantium 
            voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, rem officiis odio            
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, rem officiis odio molestias laborum corrupti error unde ipsum?
            voluptatum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            rem officiis odio molestias laborum corrupti error unde ipsum?
        </div>

    </div>
  );
}
