import React from "react";
import Select from "react-select";

import { useGetBrandsQuery } from "../services/brandDb";
import { useDispatch, useSelector } from "react-redux";
import { setProduct_BrandId } from "../features/productSlice";

const SelectBrand = () => {
  const dispatch = useDispatch();
  const { brand_id } = useSelector((state) => state.product);

  const { data, isLoading, isSuccess } = useGetBrandsQuery();
  const brands = data?.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  const seleectedBrand = brand_id
    ? brands?.filter(({ value }) => value.includes(brand_id))
    : null;

  const handleBrandChange = ({ value }) => {
    dispatch(setProduct_BrandId(value));
  };

  return (
    <div className=" bg-white p-[1.5rem] w-full border h-fit">
      <h2 className=" text-[1.125rem] mb-5"> Brands</h2>
      <Select
        options={brands}
        value={seleectedBrand}
        placeholder="Select brand"
        isLoading={isLoading}
        name="brand"
        onChange={handleBrandChange}
      />
    </div>
  );
};

export default SelectBrand;
