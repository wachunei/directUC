import React from "react";

export default function CloseIcon({ ...props }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 2L9.5 9.5m0 0L2 17m7.5-7.5L2 2m7.5 7.5L17 17"
        stroke="#828282"
        strokeWidth="3.089"
      />
    </svg>
  );
}
