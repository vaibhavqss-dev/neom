import React from "react";

type SelectDistanceProps = {
  setDistance?: (e?: any, filterType?: any) => void;
};

const SelectDistance: React.FC<SelectDistanceProps> = ({ setDistance }) => {
  return (
    <div className="selectDistance">
      <p className="selectDistance_text">How far are you willing to go?</p>

      <div className="selectDistance_btns">
        <div className="selectDistance_btns_walking">
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "walking", value: 10 } })
            }
            value="10"
            className="selectDistance_btns_btn"
          >
            10 mins Walking
          </button>
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "walking", value: 20 } })
            }
            value="20"
            className="selectDistance_btns_btn"
          >
            20 mins Walking
          </button>
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "walking", value: 30 } })
            }
            value="30"
            className="selectDistance_btns_btn"
          >
            30 mins Walking
          </button>
        </div>

        <div className="selectDistance_btns_driving">
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "driving", value: 10 } })
            }
            value="10"
            className="selectDistance_btns_btn"
          >
            10 mins drive
          </button>
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "driving", value: 20 } })
            }
            value="20"
            className="selectDistance_btns_btn"
          >
            20 mins drive
          </button>
          <button
            onClick={(e) =>
              setDistance?.(e, { distance: { type: "driving", value: 30 } })
            }
            value="30"
            className="selectDistance_btns_btn"
          >
            30 mins drive
          </button>
        </div>

        <div className="selectDistance_btns_noLimits">
          <button className="selectDistance_btns_btn">No limits</button>
        </div>
      </div>
    </div>
  );
};

export default SelectDistance;
