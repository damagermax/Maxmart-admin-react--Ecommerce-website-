import React from "react";
import { Column } from "@ant-design/plots";

const SalesChart = () => {
  const data = [
    {
      type: "JAN",
      sales: 38,
    },
    {
      type: "FEB",
      sales: 52,
    },
    {
      type: "MAR",
      sales: 30,
    },
    {
      type: "APR",
      sales: 1,
    },
    {
      type: "MAY",
      sales: 4,
    },
    {
      type: "JUN",
      sales: 38,
    },
    {
      type: "JUL",
      sales: 38,
    },
    {
      type: "AUG",
      sales: 38,
    },
    {
      type: "SEP",
      sales: 38,
    },
    {
      type: "OCT",
      sales: 38,
    },
    {
      type: "NUV",
      sales: 38,
    },
    {
      type: "DEC",
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "maxx",
      },
      sales: {
        alias: "销售额",
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
  };

  return (
    <div className=" bg-white p-5 rounded-sm lg:col-span-3 border flex flex-col  gap-10">
      <p className=" text-xs">Orders</p>

      <Column {...config} />
    </div>
  );
};

export default SalesChart;
