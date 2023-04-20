import React, { useState, useCallback, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import Search from "../components/Search";
import { TableStyles } from "../constants/Constants";
import MoreOptions from "../components/MoreOptions";
import PageHeader from "../components/PageHeader";
import ImageWithPreview from "../components/ImageWithPreview";

const PoductList = () => {
  const columns = useMemo(
    () => [
      {
        cell: (row) => (
          <div className="flex    py-3 gap-4">
            <ImageWithPreview imageUrl={row.url} />

            <div>
              <p className=" line-clamp-1">{row.name}</p>
              <p className=" text-[.7rem] text-gray-400 mt-1  ">ID: APPZ1038</p>
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
        selector: (row) => row.type,
        sortable: true,
        width: "150px",
      },
      {
        name: "Stock",
        selector: (row) => row.calories,
        sortable: true,
        width: "100px",
      },
      {
        name: "Price",
        selector: (row) => row.fat,
        sortable: true,
        width: "150px",
      },

      {
        cell: () => <MoreOptions />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "50px",
      },
    ],
    []
  );

  const tableDataItems = [
    {
      name: "Sceptre IPS 24-Inch Business Computer Monitor",
      type: "mango",
      calories: 0,
      fat: "$1,800.00",
      url: "https://m.media-amazon.com/images/I/616nHsJfEZL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      name: "Sceptre IPS 24-Inch Business Computer Monitor",
      type: "mango",
      calories: 0,
      fat: "$1,800.00",
      url: "https://m.media-amazon.com/images/I/616nHsJfEZL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      name: "Sceptre IPS 24-Inch Business Computer Monitor",
      type: "mango",
      calories: 0,
      fat: "$1,800.00",
      url: "https://m.media-amazon.com/images/I/616nHsJfEZL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      name: "2 Pack Compatible with 2022 MacBook Air 13.6 inch...",
      type: "mango",
      calories: 0,
      fat: "$999988",
      url: "https://images-na.ssl-images-amazon.com/images/I/71EM85dJFYL._AC_UL210_SR195,210_.jpg",
    },
    {
      name: "Dell Inspiron 3910 Desktop Computer Tower ",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://images-na.ssl-images-amazon.com/images/I/71ilwAO89yL._AC_UL127_SR127,127_.jpg",
    },
    {
      name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://images-na.ssl-images-amazon.com/images/I/61f1YfTkTDL._AC_UL127_SR127,127_.jpg",
    },
    {
      name: "Sceptre IPS 24-Inch Business Computer Monitor",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://m.media-amazon.com/images/I/616nHsJfEZL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      name: "2 Pack Compatible with 2022 MacBook Air 13.6 inch...",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://images-na.ssl-images-amazon.com/images/I/71EM85dJFYL._AC_UL210_SR195,210_.jpg",
    },
    {
      name: "Dell Inspiron 3910 Desktop Computer Tower ",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://images-na.ssl-images-amazon.com/images/I/71ilwAO89yL._AC_UL127_SR127,127_.jpg",
    },
    {
      name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
      type: "mango",
      calories: 0,
      fat: 0,
      url: "https://images-na.ssl-images-amazon.com/images/I/61f1YfTkTDL._AC_UL127_SR127,127_.jpg",
    },
  ];

  return (
    <>
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
          data={tableDataItems}
          columns={columns}
          selectableRows
          pagination
          customStyles={TableStyles}
        />
      </div>
    </>
  );
};

export default PoductList;
