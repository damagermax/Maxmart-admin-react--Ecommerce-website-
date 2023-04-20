import { useMemo, useEffect } from "react";
import Search from "../components/Search";
import { TableStyles } from "../constants/Constants";
import DataTable from "react-data-table-component";
import ImageWithPreview from "../components/ImageWithPreview";
import VisibilityStatus from "../components/VisibilityStatus";
import MoreOptions from "../components/MoreOptions";
import PageHeader from "../components/PageHeader";
import { useGetBrandsQuery, useDeleteBrandMutation } from "../services/brandDb";
import { Spin, message } from "antd";

const Brands = () => {
  const { data, isLoading, isError } = useGetBrandsQuery();

  const [
    deleteBrand,
    {
      isLoading: isDeleting,
      isSuccess: isDeletingSuccess,
      isError: isDeletingError,
    },
  ] = useDeleteBrandMutation();

  const deleteItem = async (id) => {
    await deleteBrand(id);
  };

  useEffect(() => {
    isDeletingSuccess &&
      messageApi.open({
        type: "success",
        content: "item deleted successfully",
      });

    isDeletingError &&
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
  }, [isDeletingSuccess, isDeletingError]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        grow: 5,
      },

      {
        name: "Logo",
        cell: ({ logoUrl }) => <ImageWithPreview imageUrl={logoUrl} />,
        ignoreRowClick: true,
      },

      {
        name: "Visibility",
        cell: ({ isVisible }) => <VisibilityStatus isVisible={isVisible} />,

        sortable: true,
      },

      {
        cell: ({ id }) => (
          <MoreOptions
            id={id}
            editPath={"/editbrand"}
            deleteItem={deleteItem}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "60px",
      },
    ],
    []
  );

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Spin spinning={isDeleting}>
      {contextHolder}
      <PageHeader pageTitle="Brands" path="/addbrand" btnText="New Brand" />
      <div className=" bg-white py-[1.5rem] w-full  h-screen border mt-8 text-2xl">
        <div className="pb-4 px-4">
          <Search size="large" />
        </div>
        <hr />
        <DataTable
          data={data}
          paginationPerPage={12}
          columns={columns}
          highlightOnHover
          progressPending={isLoading}
          selectableRows
          pagination={data ? data.length > 12 : false}
          customStyles={TableStyles}
        />
      </div>
    </Spin>
  );
};

export default Brands;
