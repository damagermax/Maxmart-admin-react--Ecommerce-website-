import React from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SelectImage = ({ onSelectImage, onRemoveImage, imageUrl }) => {
  const props = {
    onRemove: onRemoveImage,
    beforeUpload: onSelectImage,
    imageUrl,
  };
  return (
    <div className="mt-5">
      <h2 className=" text-[1.125rem] mb-[.375rem]"> Image</h2>

      <div className="w-full border h-[200px] mb-[.375rem] p-5">
        <img
          className=" object-contain h-full mx-auto "
          src={imageUrl}
          alt={imageUrl}
        />
      </div>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </div>
  );
};

export default SelectImage;
