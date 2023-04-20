import React from "react";

const VisibilityStatus = ({ isVisible }) => {
  return (
    <p
      className={`${
        isVisible ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"
      } py-[2px] px-[10px] rounded-sm text-xs  font-normal`}
    >
      {isVisible ? "Visible" : "Hidden"}
    </p>
  );
};

export default VisibilityStatus;
