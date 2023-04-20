import { useEffect } from "react";
import BasicCategoryInfo from "../components/BasicCategoryInfo";
import Visibility from "../components/Visibility";
import {
  setVisibility,
  resetCategory,
} from "../features/addCategory/addCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useSaveCategoryMutation } from "../services/category";
import { Spin, message } from "antd";
import PageHeader from "../components/PageHeader";

const AddCategories = () => {
  const [saveCateegory, { isLoading, isSuccess, isError, reset }] =
    useSaveCategoryMutation();

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    isSuccess &&
      messageApi.open({
        type: "success",
        content: "Category saveed successfully",
      });

    isSuccess && dispatch(resetCategory());

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

  const { name, sku, shortDescription, imageFile, isVisible } = useSelector(
    (state) => state.addCategory
  );

  const onVisibilityChange = ({ target }) => {
    dispatch(setVisibility(target.value));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      name == null ||
      shortDescription == null ||
      imageFile == null ||
      sku == null ||
      imageFile == null
    ) {
      warning();
      return;
    }

    const category = {
      id: nanoid(10),
      sku,
      name,
      imageUrl: imageFile,
      shortDescription,
      isVisible,
    };

    await saveCateegory(category);
    reset();
  };

  return (
    <Spin spinning={isLoading} size="large">
      {contextHolder}

      <PageHeader
        pageTitle="Add Category"
        form="add-category-form"
        btnText="Save"
      />

      <form id="add-category-form" onSubmit={onSubmit}>
        <fieldset disabled="" className="grid grid-cols-3 gap-5 mt-8 ">
          <BasicCategoryInfo />

          <Visibility
            visibilityValue={isVisible}
            onVisibilityChange={onVisibilityChange}
          />
        </fieldset>
      </form>
    </Spin>
  );
};

export default AddCategories;
