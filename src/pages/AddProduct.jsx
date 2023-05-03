import { useState, useEffect } from "react";
import { Spin, message } from "antd";
import BasicProductInfo from "../components/BasicProductInfo";
import Visibility from "../components/Visibility";
import SelectCategory from "../components/SelectCategory";
import SelectBrand from "../components/SelectBrand";
import PageHeader from "../components/PageHeader";
import { isEmpty } from "lodash";
import { nanoid } from "@reduxjs/toolkit";
import { resetProduct, setProductVisibility } from "../features/productSlice";
import { useSaveProductMutation } from "../services/productDb";
import { useSelector, useDispatch } from "react-redux";
import SelectMultiImages from "../components/SelectMultiImages";

const AddProduct = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [saveProduct, { isLoading, isSuccess, isError }] =
    useSaveProductMutation();

  const {
    name,
    price,
    brand_id,
    category_id,
    description,
    short_despcription,
    quantity,
    imageFiles,
    isVisible,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const onVisibilityChange = ({ target }) => {
    dispatch(setProductVisibility(target.value));
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: `${name} saveed successfully`,
      });
      dispatch(resetProduct());
    }
    isError &&
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
  }, [isSuccess, isError]);

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: `${message}`,
    });
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    if (isEmpty(imageFiles) || isEmpty(brand_id) || isEmpty(category_id)) {
      warning("Please fill in all fields");
      return;
    }

    const product = {
      id: nanoid(12),
      name,
      price,
      brand_id,
      category_id,
      description,
      short_despcription,
      quantity,
      images: imageFiles,
      isVisible,
    };

    await saveProduct(product);
  };

  return (
    <Spin size="large" spinning={isLoading}>
      {contextHolder}
      <PageHeader
        pageTitle="Add Prodeuct"
        form="add-product-form"
        btnText="Save"
      />
      <form id="add-product-form" onSubmit={handleProductSubmit}>
        <div className="grid lg:grid-cols-3  gap-2 lg:gap-5 mt-8">
          <div className=" lg:col-span-2 grid gap-2 lg:gap-5">
            <BasicProductInfo />
            <SelectMultiImages isSuccess={isSuccess} />
          </div>
          <div className=" flex flex-col gap-2 lg:gap-5">
            <Visibility
              visibilityValue={isVisible}
              onVisibilityChange={onVisibilityChange}
            />
            <SelectCategory />
            <SelectBrand />
          </div>
        </div>
      </form>
    </Spin>
  );
};

export default AddProduct;
