import React, { useMemo } from "react";
import Search from "../components/Search";
import { TableStyles } from "../constants/Constants";
import { FaRegEye } from "react-icons/fa";
import DataTable from "react-data-table-component";
import PageHeader from "../components/PageHeader";

const Orders = () => {
  const orderstatus = {
    PENDING: "Pending",
    CANCELED: "Canceled",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
  };
  const columns = useMemo(
    () => [
      {
        name: "Number",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
      },
      {
        name: "Customer",
        selector: (row) => row.customer,
        sortable: true,
      },

      {
        name: "Status",
        cell: ({ status }) => (
          <p
            className={`${
              status === orderstatus.SHIPPED
                ? "bg-blue-100 text-blue-900"
                : status === orderstatus.PENDING
                ? "bg-red-100 text-red-900"
                : status === orderstatus.PROCESSING
                ? "bg-yellow-100 text-yellow-900"
                : status === orderstatus.DELIVERED
                ? "bg-green-100 text-green-900"
                : "bg-gray-100 text-gray-900"
            } py-[2px] px-[10px] rounded-sm text-xs font-medium`}
          >
            {status}
          </p>
        ),
        sortable: true,
      },
      {
        name: "Items",
        selector: (row) => row.items,
        sortable: true,
      },
      {
        name: "Total",
        selector: (row) => row.total,
        sortable: true,
      },
      {
        cell: () => <FaRegEye className=" text-green-900 cursor-pointer " />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "60px",
      },
    ],
    []
  );
  const data = [
    {
      id: "#APP13432",
      date: "June 26, 2021",
      customer: "Maxwell Takyi",
      payment_status: "Paid",
      status: "Pending",
      items: "7 items",
      total: "$1200.00",
    },
    {
      id: "#APP13432",
      date: "June 26, 2021",
      customer: "Maxwell Takyi",
      payment_status: "Paid",
      status: "Canceled",
      items: "7 items",
      total: "$1200.00",
    },
    {
      id: "#APP13432",
      date: "June 26, 2021",
      customer: "Kwame Addo Kuffour",
      payment_status: "Paid",
      status: "Delivered",
      items: "7 items",
      total: "$200.00",
    },
    {
      id: "#WTT13432",
      date: "April 26, 2021",
      customer: "Asare Enock",
      payment_status: "Paid",
      status: "Shipped",
      items: "7 items",
      total: "$1200.00",
    },
    {
      id: "#GDD13432",
      date: "May 26, 2021",
      customer: "Maxwell Takyi",
      payment_status: "Paid",
      status: "Processing",
      items: "2 items",
      total: "$100.00",
    },
    {
      id: "#APP13432",
      date: "June 26, 2021",
      customer: "Kwame Addo Kuffour",
      payment_status: "Paid",
      status: "Delivered",
      items: "7 items",
      total: "$200.00",
    },
    {
      id: "#WTT13432",
      date: "April 26, 2021",
      customer: "Asare Enock",
      payment_status: "Paid",
      status: "Shipped",
      items: "7 items",
      total: "$1200.00",
    },
    {
      id: "#GDD13432",
      date: "May 26, 2021",
      customer: "Maxwell Takyi",
      payment_status: "Paid",
      status: "Processing",
      items: "2 items",
      total: "$100.00",
    },
  ];

  return (
    <>
      <PageHeader pageTitle="Orders" />
      <div className=" bg-white py-[1.5rem] w-full h-screen border mt-4 text-2xl">
        <div className="pb-4 px-4">
          <Search size="large" />
        </div>
        <hr />
        <DataTable
          data={data}
          columns={columns}
          selectableRows
          pagination
          customStyles={TableStyles}
        />
      </div>
    </>
  );
};

export default Orders;
