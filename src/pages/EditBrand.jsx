import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Visibility from "../components/Visibility";
import PageHeader from "../components/PageHeader";
import InputField from "../components/InputField";
import SelectImage from "../components/SelectImage";
import { Spin, message } from "antd";
import isEqual from "lodash/isEqual";
import { isEmpty } from "lodash";

// reedux

import { useDispatch, useSelector } from "react-redux";
import {
  setBrandName,
  setBrandLogoFile,
  setBrandLogoUrl,
  setBrandVisibility,
  setToBeUpdatedBrand,
} from "../features/brandSlice";
import { useGetBrandQuery } from "../services/brandDb";
import { useUpdateBrandMutation } from "../services/brandDb";
//=======================================================================

const EditBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { name, isVisible, logoFile, logoUrl } = useSelector(
    (state) => state.brand
  );

  const { data } = useGetBrandQuery(id);
  const [updateBrand, { isLoading, isError, isSuccess }] =
    useUpdateBrandMutation();

  useEffect(() => {
    dispatch(setToBeUpdatedBrand(data));
  }, [data]);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    isSuccess &&
      messageApi.open({
        type: "success",
        content: "Brand saveed successfully",
      });

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

    const newBrand = {
      id: data?.id,
      name,
      isVisible,
      logoUrl: logoFile ? logoFile : logoUrl,
    };

    if (isEqual(data, newBrand)) {
      warning("No changes made");
      return;
    }

    if (isEmpty(name) || isEmpty(logoUrl)) {
      warning("Please fill in all fields");
      return;
    }
    await updateBrand(newBrand);
  };
  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <PageHeader
        pageTitle="Edit Brand"
        form="update-brand-form"
        btnText="Update"
      />

      <form id="update-brand-form" onSubmit={handleBrandSubmition}>
        <div className="grid grid-cols-3 gap-5 mt-8 ">
          <fieldset className=" bg-white p-[1.5rem] w-full  border col-span-2">
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

export default EditBrand;
