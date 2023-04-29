import React from "react";
import { Pie } from "@ant-design/plots";

const OrderChart = () => {
  const data = [
    {
      type: "Pending",
      value: 27,
    },
    {
      type: "Shiped",
      value: 25,
    },
    {
      type: "processing",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 10,
      },
    },
    legend: {
      position: "bottom",
      flipPage: false,
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          height: 100,
        },
        content: "",
      },
    },
  };
  return (
    <div className=" bg-white p-5 rounded-sm border  flex flex-col justify-between">
      <p>Orders</p>
      <Pie {...config} />
    </div>
  );
};

export default OrderChart;
