import Visibility from "../components/Visibility";
import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import SelectImage from "../components/SelectImage";
import { message, Spin } from "antd";
import { useEffect } from "react";

// reedux

import { useDispatch, useSelector } from "react-redux";
import { useSaveBrandMutation } from "../services/brandDb";
import {
  setBrandName,
  setBrandLogoFile,
  setBrandLogoUrl,
  setBrandVisibility,
  reset,
} from "../features/brandSlice";
import { nanoid } from "@reduxjs/toolkit";
//=======================================================================

const AddBrand = () => {
  const dispatch = useDispatch();

  const [saveBrand, { isLoading, isSuccess, isError }] = useSaveBrandMutation();
  const { name, isVisible, logoFile, logoUrl } = useSelector(
    (state) => state.brand
  );

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    isSuccess &&
      messageApi.open({
        type: "success",
        content: "Brand saveed successfully",
      });

    isSuccess && dispatch(reset());

    isError &&
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
  }, [isSuccess, isError]);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill in all fields",
    });
  };

  const onVisibilityChange = ({ target }) => {
    dispatch(setBrandVisibility(target.value));
  };

  const onBrandNameChange = ({ target }) => {
    dispatch(setBrandName(target.value));
  };

  const handleBrandLogoSelection = (file) => {
    const logoUrl = URL.createObjectURL(file);

    dispatch(setBrandLogoFile(file));
    dispatch(setBrandLogoUrl(logoUrl));
    return false;
  };

  const handleBrandLogoRemoval = () => {
    dispatch(setBrandLogoFile(null));
    dispatch(setBrandLogoUrl(""));
  };

  const handleBrandSubmition = async (event) => {
    event.preventDefault();

    if (name == null || logoFile == null) {
      warning();
      return;
    }

    const brand = { id: nanoid(10), name, isVisible, logoUrl: logoFile };
    await saveBrand(brand);
  };
  return (
    <Spin size="large" spinning={isLoading}>
      {contextHolder}
      <PageHeader pageTitle="Add Brand" form="brand-form" btnText="Save" />
      <form id="brand-form" onSubmit={handleBrandSubmition}>
        <div className="grid lg:grid-cols-3 gap-2 lg:gap-5 mt-8 ">
          <fieldset className=" bg-white p-[1.5rem] w-full  border lg:col-span-2">
            <h2 className=" text-[1.125rem] mb-5 "> Basic Information</h2>
            <InputField
              name={"name"}
              value={name}
              onChange={onBrandNameChange}
            />
            <SelectImage
              onRemoveImage={handleBrandLogoRemoval}
              imageUrl={logoUrl}
              onSelectImage={handleBrandLogoSelection}
            />
          </fieldset>

          <Visibility
            visibilityValue={isVisible}
            onVisibilityChange={onVisibilityChange}
          />
        </div>
      </form>
    </Spin>
  );
};

export default AddBrand;
