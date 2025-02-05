import "./map.css"
import React from "react";
import map from "../../../assets/map.png";

export default function Map(){


    return(
        <>  
            <div className="mapContainer">
                <p className="mapContainer_title">
                    Find Events on Map
                </p>

                <div className="mapContainer_map">
                    <img src={map} alt="" />
                </div>
            </div>
        </>
    )
}