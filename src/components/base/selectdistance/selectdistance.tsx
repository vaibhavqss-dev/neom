import React from "react";

export default function SelectDistance() {
  return (
    <div className="selectDistance">
      <p className="selectDistance_text">How far are you willing to go?</p>

      <div className="selectDistance_btns">
        <div className="selectDistance_btns_walking">
          <button className="selectDistance_btns_btn">10 mins Walking</button>
          <button className="selectDistance_btns_btn">20 mins Walking</button>
          <button className="selectDistance_btns_btn">30 mins Walking</button>
        </div>

        <div className="selectDistance_btns_driving">
          <button className="selectDistance_btns_btn">10 mins drive</button>
          <button className="selectDistance_btns_btn">20 mins drive</button>
          <button className="selectDistance_btns_btn">30 mins drive</button>
        </div>

        <div className="selectDistance_btns_noLimits">
          <button className="selectDistance_btns_btn">No limits</button>
        </div>
      </div>
    </div>
  );
}
