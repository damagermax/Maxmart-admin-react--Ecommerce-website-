import React from "react";
import PrimaryButton from "./PrimaryButton";

const PageHeader = ({ pageTitle, path, onClick, btnText, form }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className=" text-[1.3rem]  font-medium">{pageTitle}</h1>
    <PrimaryButton
      btnName={btnText}
      onClick={onClick}
      form={form}
      path={path}
    />
  </div>
);
export default PageHeader;
