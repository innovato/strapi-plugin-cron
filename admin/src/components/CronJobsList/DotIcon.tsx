import React from "react";

type Props = {
  variant: "red" | "green";
  onClick;
};

export const DotIcon: React.FunctionComponent<Props> = (props) => {
  const color = {
    red: "#ee5e52",
    green: "#5cb176",
  }[props.variant];

  return (
    <svg
      onClick={props.onClick}
      style={{
        cursor: "pointer",
      }}
      width="1em"
      height="1em"
      viewBox="0 0 4 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="4" height="4" rx="2" fill={color}></rect>
    </svg>
  );
};
