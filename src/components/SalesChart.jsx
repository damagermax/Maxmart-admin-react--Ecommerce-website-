import React from "react";
import { Column } from "@ant-design/plots";

const SalesChart = () => {
  const data = [
    {
      type: "家具家电",
      sales: 38,
    },
    {
      type: "粮油副食",
      sales: 52,
    },
    {
      type: "生鲜水果",
      sales: 30,
    },
    {
      type: "美容洗护",
      sales: 1,
    },
    {
      type: "母婴用品",
      sales: 4,
    },
    {
      type: "进口食品",
      sales: 38,
    },
    {
      type: "食品饮料",
      sales: 38,
    },
    {
      type: "家庭清洁",
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
    <div className=" bg-white p-5 rounded-sm col-span-3 border flex flex-col  gap-10">
      <p className=" text-xs">Orders</p>

      <Column {...config} />
    </div>
  );
};

export default SalesChart;
