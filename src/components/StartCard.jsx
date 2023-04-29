import React from "react";

const StartCard = ({ children, color, title, figures }) => {
  return (
    <div className=" bg-white  p-[1rem]  rounded-sm border flex items-center gap-4 shadow-xs">
      <div
        className={` ${color} rounded-full  w-[3rem] h-[3rem] flex items-center justify-center `}
      >
        {children}
      </div>

      <div>
        <p className=" text-xs ">{title}</p>
        <h2 className="  text-lg">{figures}</h2>
      </div>
    </div>
  );
};

export default StartCard;
