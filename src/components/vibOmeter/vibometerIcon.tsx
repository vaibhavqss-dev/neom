import React, { useEffect } from "react";
import needleimg from "./../../assets/needle.svg";

const VibometerIcon: React.FC = () => {
  useEffect(() => {
    const gauge = document.querySelector(".gauge");
    if (!gauge) return;

    const totalBricks = 30;
    const colors = [
      "#55BF3B",
      "#9ACC0D",
      "#ACE50D",
      "#D8D90F",
      "#FFB03A",
      "#FF385C",
    ];

    for (let i = 0; i < totalBricks; i++) {
      const brick = document.createElement("div");
      i < 15
        ? (brick.style.transform = "rotate(" + (-90 + 6 * i + 1) + "deg)")
        : (brick.style.transform = "rotate(" + (-90 + 6 * i + 4) + "deg)");
      brick.className = "brick";
      const color = colors[Math.floor(i / 5)];
      brick.style.background = color;

      const radius = 180;
      const angle = 180 - i * (180 / (totalBricks - 1));
      const rad = (angle * Math.PI) / 180;
      const x = 100 + radius * Math.cos(rad) - 10;
      const y = 100 - radius * Math.sin(rad) - 10;
      brick.style.left = x + "px";
      brick.style.top = y + "px";

      if (i % 5 === 0) {
        const emoji = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = `x = ${x.toFixed(1)} y = ${y.toFixed(1)}`;
        p.style.fontSize = "10px";
        emoji.className = "emoji";
        emoji.innerHTML = ["😀", "😊", "😐", "😕", "😟", "😢"][
          Math.floor(i / 5)
        ];
        emoji.style.position = "absolute";
        emoji.style.left = x + (-10 + i * 4) + "px";
        emoji.style.top = (i < 15 ? y - 20 : y - 20 + i) + "px";
        emoji.style.transform = "translate(-50%, -50%)";
        emoji.appendChild(p);
        gauge.appendChild(emoji);
      }
      gauge.appendChild(brick);
    }

    const needle = document.getElementById("needle");
    if (!needle) return;
    needle.style.transition = "transform 2s ease";
    let i = 1;
    setInterval(() => {
      if (!needle) return;
      const brick = i;
      const brickMiddle = -90 + 6 * (brick - 1);
      needle.style.transform = "rotate(" + brickMiddle + "deg)";
      i++;
      if (i === 32) i = 1;
    }, 100);
  }, []);

  return (
    <div className="vibometer_img">
      <div className="gauge">
        <div className="arc"></div>
        <div className="needle-container" id="needle">
          <div className="needle"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default VibometerIcon;
