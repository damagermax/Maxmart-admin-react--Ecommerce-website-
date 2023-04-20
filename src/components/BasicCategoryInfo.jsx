import React, { useState } from "react";
import InputField from "../components/InputField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setSKU,
  setimageUrl,
  setShortDescription,
  setimageFile,
} from "../features/addCategory/addCategorySlice";
import SelectImage from "./SelectImage";

function BasicCategoryInfo() {
  const { name, sku, shortDescription, imageUrl } = useSelector(
    (state) => state.addCategory
  );

  const dispatch = useDispatch();

  const handleShortDescriptionChange = (content) => {
    dispatch(setShortDescription(content));
  };

  const handleNameChange = (event) => {
    dispatch(setName(event.target.value));
  };

  const handleSKUChange = (event) => {
    dispatch(setSKU(event.target.value));
  };

  const handleImageSelection = (file) => {
    const imageUrl = URL.createObjectURL(file);

    dispatch(setimageFile(file));
    dispatch(setimageUrl(imageUrl));
    return false;
  };

  const handleImageRemoval = () => {
    dispatch(setimageUrl(""));
    dispatch(setimageFile(null));
  };

  return (
    <div className="bg-white p-[1.5rem] w-full border col-span-2">
      <h2 className="text-[1.125rem] mb-5">Basic Information</h2>

      <InputField name="Name" value={name} onChange={handleNameChange} />

      <InputField name="SKU" value={sku} onChange={handleSKUChange} />

      <p className="font-medium text-[.874rem] mt-4 mb-[.375rem]">
        Short Description
      </p>
      <ReactQuill
        theme="snow"
        value={shortDescription}
        onChange={handleShortDescriptionChange}
        className="bg-white"
      />

      <SelectImage
        onSelectImage={handleImageSelection}
        imageUrl={imageUrl}
        onRemoveImage={handleImageRemoval}
      />
    </div>
  );
}

export default BasicCategoryInfo;
