import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputField from "../components/InputField";
import {
  setProductName,
  setProductPrice,
  setProductQuntity,
  setProductDescription,
  setProductShortDescription,
} from "../features/productSlice";

import { useSelector, useDispatch } from "react-redux";

const BasicProductInfo = () => {
  const [value, setValue] = useState("");
  const { name, price, short_Description, description, quantity } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const handleProductNameChange = ({ target }) => {
    dispatch(setProductName(target.value));
  };

  const handleProductPriceChange = ({ target }) => {
    dispatch(setProductPrice(target.value));
  };
  const handleProductQuantityChange = ({ target }) => {
    dispatch(setProductQuntity(target.value));
  };
  const handleProductDescriptionChange = (content) => {
    dispatch(setProductDescription(content));
  };
  const handleProductShortDesChange = ({ target }) => {
    dispatch(setProductShortDescription(target.value));
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className=" bg-white p-[1.5rem] w-full border">
      <h2 className=" text-[1.125rem] mb-5"> Basic Information</h2>

      <InputField name="Name" onChange={handleProductNameChange} value={name} />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          name="Price"
          type="number"
          value={price}
          onChange={handleProductPriceChange}
        />
        <InputField
          name="Stock Quantity"
          type="number"
          onChange={handleProductQuantityChange}
          value={quantity}
        />
      </div>

      <div>
        <p className="  font-medium text-[.874rem] mt-2 mb-[.375rem]">
          Description
        </p>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleProductDescriptionChange}
          className="bg-white  "
        />
      </div>
      <p className="  font-medium text-[.874rem] mt-4 mb-[.375rem]">
        Short Description
      </p>
      <textarea
        name="short_description"
        required
        onChange={handleProductShortDesChange}
        className=" w-full h-[4rem] border border-gray-300"
      ></textarea>
    </div>
  );
};

export default BasicProductInfo;
