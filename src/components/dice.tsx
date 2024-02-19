import React from "react";

type DiceProps = {
  value: Number;
  placeholder?: boolean;
  crossed?: boolean;
  glow?: boolean;
  onClick?: () => void;
};

const DiceIcon: React.FunctionComponent<DiceProps> = ({
  value,
  placeholder,
  crossed,
  glow,
  onClick,
}) => {
  const primaryColor = placeholder ? "#eee" : "#8c2f39";
  const backgroundColor = glow ? "#52262a" : "#222";

  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{
        width: "100%",
        height: "auto",
        filter: glow ? "drop-shadow(0 0 5px #8c2f39)" : "none",
        cursor: placeholder ? "pointer" : "normal",
      }}
    >
      <rect width="10" height="10" x="0" y="0" fill={backgroundColor} rx="2" />
      {value === 1 && <circle cx="5" cy="5" r="1" fill={primaryColor} />}
      {value === 2 && (
        <>
          <circle cx="3" cy="3" r="1" fill={primaryColor} />
          <circle cx="7" cy="7" r="1" fill={primaryColor} />
        </>
      )}
      {value === 3 && (
        <>
          <circle cx="5" cy="5" r="1" fill={primaryColor} />
          <circle cx="3" cy="3" r="1" fill={primaryColor} />
          <circle cx="7" cy="7" r="1" fill={primaryColor} />
        </>
      )}
      {value === 4 && (
        <>
          <circle cx="3" cy="3" r="1" fill={primaryColor} />
          <circle cx="7" cy="7" r="1" fill={primaryColor} />
          <circle cx="3" cy="7" r="1" fill={primaryColor} />
          <circle cx="7" cy="3" r="1" fill={primaryColor} />
        </>
      )}
      {value === 5 && (
        <>
          <circle cx="5" cy="5" r="1" fill={primaryColor} />
          <circle cx="3" cy="3" r="1" fill={primaryColor} />
          <circle cx="7" cy="7" r="1" fill={primaryColor} />
          <circle cx="3" cy="7" r="1" fill={primaryColor} />
          <circle cx="7" cy="3" r="1" fill={primaryColor} />
        </>
      )}
      {value === 6 && (
        <>
          <circle cx="3" cy="2" r="1" fill={primaryColor} />
          <circle cx="7" cy="2" r="1" fill={primaryColor} />
          <circle cx="3" cy="5" r="1" fill={primaryColor} />
          <circle cx="7" cy="5" r="1" fill={primaryColor} />
          <circle cx="3" cy="8" r="1" fill={primaryColor} />
          <circle cx="7" cy="8" r="1" fill={primaryColor} />
        </>
      )}
      {value === 7 && (
        <>
          <path
            d="M3.22 8.421c-.022-.142.4-1.91-1.674-2.219-.006-.834-.028-1.905.023-2.644C1.687 1.845 3.747.788 5.02.782 7.767.771 8.403 3.565 8.403 3.565v2.656c-1.803.36-1.748 1.61-1.71 2.2-.776 1.138-2.918.775-3.474 0z"
            style={{ fill: primaryColor }}
          />
          <rect
            width={1.85}
            height={0.59}
            x={5.612}
            y={1.24}
            rx={0.458}
            ry={0.231}
            style={{
              fill: backgroundColor,
              strokeLinejoin: "round",
            }}
            transform="matrix(.72891 .6846 -.76407 .64513 0 0)"
          />
          <rect
            width={1.85}
            height={0.59}
            x={-0.527}
            y={-6.787}
            rx={0.458}
            ry={0.231}
            style={{
              fill: backgroundColor,
              strokeLinejoin: "round",
            }}
            transform="matrix(-.72605 .68765 -.59936 -.80048 0 0)"
          />
          <rect
            width={1.85}
            height={0.59}
            x={7.414}
            y={-0.651}
            rx={0.458}
            ry={0.231}
            style={{
              fill: backgroundColor,
              strokeLinejoin: "round",
            }}
            transform="matrix(.72891 .6846 -.76407 .64513 0 0)"
          />
          <rect
            width={1.85}
            height={0.59}
            x={-2.742}
            y={-8.706}
            rx={0.458}
            ry={0.231}
            style={{
              fill: backgroundColor,
              strokeLinejoin: "round",
            }}
            transform="matrix(-.72605 .68765 -.59936 -.80048 0 0)"
          />
        </>
      )}

      {crossed && (
        <path
          d="M0 0L10 10M0 10L10 0"
          stroke={primaryColor}
          strokeWidth="0.7"
        />
      )}
    </svg>
  );
};

export default DiceIcon;
