import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Visibility from "../components/Visibility";
import BasicCategoryInfo from "../components/BasicCategoryInfo";
import PageHeader from "../components/PageHeader";
import { Spin, message } from "antd";
import { isEqual, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

// redux
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "../services/category";
import {
  setVisibility,
  setNewCatagory,
  resetCategory,
} from "../features/addCategory/addCategorySlice";
import { useSelector, useDispatch } from "react-redux";

// =============================================================================================//

const EditCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useGetCategoryQuery(id);

  const navigate = useNavigate();

  const [updateCategory, { isLoading, isError, isSuccess }] =
    useUpdateCategoryMutation();

  const { name, sku, shortDescription, imageUrl, imageFile, isVisible } =
    useSelector((state) => state.addCategory);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    dispatch(setNewCatagory(data));
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Category saveed successfully",
      });

      setTimeout(resetformAndNavigateback, 1000);
    }

    isError &&
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
  }, [isSuccess, isError]);

  const resetformAndNavigateback = () => {
    dispatch(resetCategory());
    navigate(-1);
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: `${message}`,
    });
  };

  const onVisibilityChange = ({ target }) => {
    dispatch(setVisibility(target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEmpty(shortDescription) || isEmpty(imageUrl)) {
      warning("Please fill in all fields");
      return;
    }

    const newCategory = {
      id,
      sku,
      name,
      imageUrl: imageFile ? imageFile : imageUrl,
      shortDescription,
      isVisible,
    };

    if (isEqual(data, newCategory)) {
      warning("No changes made");
      return;
    }

    await updateCategory(newCategory);
  };

  return (
    <Spin spinning={isLoading} size="large">
      {contextHolder}

      <PageHeader
        pageTitle="Edit Category"
        form="update-category-form"
        btnText="Update"
      />

      <form id="update-category-form" onSubmit={handleSubmit}>
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

export default EditCategory;
