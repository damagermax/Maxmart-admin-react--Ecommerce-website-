import React from "react";
import StartCard from "..//components/StartCard";
import PageHeader from "../components/PageHeader";
import {
  FiClipboard,
  FiShoppingBag,
  FiUsers,
  FiDatabase,
} from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Sales from "../components/SalesChart";
import OrderChart from "../components/OrderChart";

const Dashboard = () => {
  return (
    <>
      <PageHeader pageTitle="Dashboard" />
      <div className=" grid lg:grid-cols-4 gap-2 lg:gap-3 sm:grid-cols-2 ">
        <StartCard
          color="bg-red-100 text-red-700"
          title="Tota Products"
          figures="200000000"
        >
          <FiClipboard />
        </StartCard>
        <StartCard
          color="bg-violet-100 text-violet-700"
          title="Total Orders"
          figures="2800"
        >
          <FiShoppingBag />
        </StartCard>
        <StartCard
          color="bg-green-100 text-green-700"
          title="Total Customers"
          figures="700"
        >
          <FiUsers />
        </StartCard>
        <StartCard
          color="bg-yellow-100 text-yellow-700"
          title="Total Sales"
          figures="700"
        >
          <FiDatabase />
        </StartCard>
      </div>

      <div className=" grid lg:grid-cols-4 grid-cols-1 gap-2 lg:gap-3 my-3 ">
        <OrderChart />
        <Sales />
      </div>
    </>
  );
};

export default Dashboard;
