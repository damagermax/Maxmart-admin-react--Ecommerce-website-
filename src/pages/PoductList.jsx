import React, { useState, useCallback, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import Search from "../components/Search";
import { TableStyles } from "../constants/Constants";
import MoreOptions from "../components/MoreOptions";
import PageHeader from "../components/PageHeader";
import ImageWithPreview from "../components/ImageWithPreview";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../services/productDb";
import { useGetCategoriesQuery } from "../services/category";
import StockStatus from "../components/StockStatus";
import { Spin, message } from "antd";

const PoductList = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [
    deleteProduct,
    {
      isLoading: isDeletingProduct,
      isSuccess: isDeletingSuccess,
      isError: isDeletingError,
    },
  ] = useDeleteProductMutation();

  const { data, isLoading, isError } = useGetProductsQuery();

  const getCategory = (category_id) => {
    const category = categories?.filter(({ id }) => id.includes(category_id));

    return category ? category[0]?.name : null;
  };

  const [messageApi, contextHolder] = message.useMessage();

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
  }, [isDeletingSuccess]);
  const deleteProductItem = async (id) => {
    await deleteProduct(id);
  };

  const columns = useMemo(
    () => [
      {
        cell: (row) => (
          <div className="flex    py-3 gap-4">
            <ImageWithPreview imageUrl={row.images[0]} />

            <div>
              <p className=" line-clamp-1">{row.name}</p>
              <p className=" text-[.7rem] text-gray-400 mt-1  ">
                {"id: " + row.id}
              </p>
            </div>
          </div>
        ),
        name: "Product",
        sortable: true,
        grow: 5,
        minWidth: "400px",
        maxWidth: "61%",
      },
      {
        name: "Category",
        selector: ({ category_id }) => getCategory(category_id),
        sortable: true,
        width: "150px",
      },
      {
        name: "Stock",
        cell: ({ quantity }) => <StockStatus quantity={quantity} />,
        sortable: true,
        width: "150px",
      },
      {
        name: "Price",
        selector: ({ price }) => `$${price}`,
        sortable: true,
        width: "130px",
      },

      {
        cell: ({ id }) => (
          <MoreOptions
            id={id}
            editPath={"/editproduct"}
            deleteItem={deleteProductItem}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "50px",
      },
    ],
    [categories]
  );

  return (
    <Spin spinning={isDeletingProduct}>
      {contextHolder}
      <PageHeader
        pageTitle="Products"
        path="/addproduct"
        btnText="New product"
      />
      <div className=" bg-white py-[1.5rem] w-full lg:h-screen  border mt-8 text-2xl ">
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

export default PoductList;
