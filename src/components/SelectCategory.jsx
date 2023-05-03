import React from "react";
import Select from "react-select";

import { useGetCategoriesQuery } from "../services/category";
import { setProduct_CategoryId } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SelectCategory = () => {
  const dispatch = useDispatch();
  const { category_id } = useSelector((state) => state.product);

  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const seleectedCategory = category_id
    ? categories?.filter(({ value }) => value.includes(category_id))
    : null;

  const handleCategoryChange = ({ value }) => {
    dispatch(setProduct_CategoryId(value));
  };

  return (
    <div className=" bg-white p-[1.5rem] w-full border h-fit">
      <h2 className=" text-[1.125rem] mb-5"> Categories</h2>
      <Select
        options={categories}
        value={seleectedCategory || null}
        placeholder="Select category"
        isLoading={isLoading}
        name="category"
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default SelectCategory;
