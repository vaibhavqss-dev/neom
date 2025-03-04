import React from "react";

interface CircleProgressProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  value,
  maxValue,
  size = 112,
  strokeWidth = 5,
  color = "white",
  backgroundColor = "rgba(133, 130, 130, 0.5)",
  className = "",
  children,
}) => {
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / maxValue) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={className}
    >
      <svg
        height={size}
        width={size}
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {children}
      </div>
    </div>
  );
};

export default CircleProgress;
