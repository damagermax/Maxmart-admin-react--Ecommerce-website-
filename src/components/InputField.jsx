import React from "react";

const InputField = ({ name, type, onChange, value }) => {
  return (
    <div>
      <label htmlFor={name} className="  font-medium  text-[.8375rem]">
        {name}
      </label>
      <input
        className="border w-full h-9 rounded-sm border-gray-300 px-4 py-2 mb-3 mt-[.3rem]"
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default InputField;
