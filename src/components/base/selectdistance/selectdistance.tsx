import React from "react";

type SelectDistanceProps = {
  setDistance?: (
    distance: { type: string; value: number },
    filterType: string
  ) => void;
  Filter?: any;
};

const SelectDistance: React.FC<SelectDistanceProps> = ({
  Filter,
  setDistance,
}) => {
  return (
    <div className="selectDistance">
      <p className="selectDistance_text">How far are you willing to go?</p>

      <div className="selectDistance_btns">
        <div className="selectDistance_btns_walking">
          <button
            onClick={() =>
              setDistance?.({ type: "walking", value: 10 }, "distance")
            }
            value="10"
            className={
              Filter?.distance?.type === "walking" &&
              Filter?.distance?.value === 10
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            10 mins Walking
          </button>
          <button
            onClick={() =>
              setDistance?.({ type: "walking", value: 20 }, "distance")
            }
            value="20"
            className={
              Filter?.distance?.type === "walking" &&
              Filter?.distance?.value === 20
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            20 mins Walking
          </button>
          <button
            onClick={() =>
              setDistance?.({ type: "walking", value: 30 }, "distance")
            }
            value="30"
            className={
              Filter?.distance?.type === "walking" &&
              Filter?.distance?.value === 30
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            30 mins Walking
          </button>
        </div>

        <div className="selectDistance_btns_driving">
          <button
            onClick={() =>
              setDistance?.({ type: "driving", value: 10 }, "distance")
            }
            value="10"
            className={
              Filter?.distance?.type === "driving" &&
              Filter?.distance?.value === 10
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            10 mins drive
          </button>
          <button
            onClick={() =>
              setDistance?.({ type: "driving", value: 20 }, "distance")
            }
            value="20"
            className={
              Filter?.distance?.type === "driving" &&
              Filter?.distance?.value === 20
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            20 mins drive
          </button>
          <button
            onClick={() =>
              setDistance?.({ type: "driving", value: 30 }, "distance")
            }
            value="30"
            className={
              Filter?.distance?.type === "driving" &&
              Filter?.distance?.value === 30
                ? "selectDistance_btns_btn_active"
                : ""
            }
          >
            30 mins drive
          </button>
        </div>

        <div className="selectDistance_btns_noLimits">
          <button
            className={
              Filter?.distance?.type === "noLimits"
                ? "selectDistance_btns_btn_active"
                : ""
            }
            onClick={() =>
              setDistance?.({ type: "noLimits", value: 0 }, "distance")
            }
          >
            No limits
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDistance;
