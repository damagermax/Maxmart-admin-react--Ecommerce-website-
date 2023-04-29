import React, { useState, useEffect } from "react";

// upload
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import BasicProductInfo from "../components/BasicProductInfo";
import Visibility from "../components/Visibility";
import SelectCategory from "../components/SelectCategory";
import SelectBrand from "../components/SelectBrand";
import PageHeader from "../components/PageHeader";

import {
  setProductImages,
  setProductImageFiles,
} from "../features/productSlice";

import { useSelector, useDispatch } from "react-redux";

const AddProduct = () => {
  const { images, imageFiles } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  return (
    <>
      <PageHeader
        pageTitle="Add Prodeuct"
        form="add-product-form"
        btnText="Save"
      />
      <div className="grid lg:grid-cols-3  gap-2 lg:gap-5 mt-8">
        <div className=" lg:col-span-2 grid gap-2 lg:gap-5">
          <BasicProductInfo />
          <UploadView />
        </div>
        <div className=" flex flex-col gap-2 lg:gap-5">
          <Visibility />
          <SelectCategory />
          <SelectBrand />
        </div>
      </div>
    </>
  );
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadView = () => {
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    let filterList = newFileList.map((data) => data.originFileObj);
    dispatch(setProductImageFiles(filterList));
    console.log(filterList);
  };
  const beforeUpload = () => false;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add Image
      </div>
    </div>
  );
  return (
    <div className=" bg-white p-[1.5rem] w-full border">
      <h2 className=" text-[1.125rem] mb-5"> Images</h2>

      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default AddProduct;
