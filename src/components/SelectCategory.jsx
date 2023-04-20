import React from "react";
import Select from "react-select";

const SelectCategory = () => {
  return (
    <div className=" bg-white p-[1.5rem] w-full border h-fit">
      <h2 className=" text-[1.125rem] mb-5"> Categories</h2>
      <Select options={[]} placeholder="" />
    </div>
  );
};

export default SelectCategory;
