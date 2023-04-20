import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputField from "../components/InputField";

const BasicProductInfo = () => {
  const [value, setValue] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className=" bg-white p-[1.5rem] w-full border">
      <h2 className=" text-[1.125rem] mb-5"> Basic Information</h2>

      <InputField name="Name" />
      <div className="grid grid-cols-2 gap-4">
        <InputField name="Price" type="number" />
        <InputField name="Stock Quantity" type="number" />
      </div>

      <div>
        <p className="  font-medium text-[.874rem] mt-2 mb-[.375rem]">
          Description
        </p>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="bg-white  "
        />
      </div>
      <p className="  font-medium text-[.874rem] mt-4 mb-[.375rem]">
        Short Description
      </p>
      <textarea
        name="short_description"
        className=" w-full h-[4rem] border border-gray-300"
      ></textarea>
    </div>
  );
};

export default BasicProductInfo;
