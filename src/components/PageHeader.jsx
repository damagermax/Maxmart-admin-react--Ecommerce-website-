import React from "react";
import PrimaryButton from "./PrimaryButton";

const PageHeader = ({ pageTitle, path, onClick, btnText, form }) => (
  <div className="flex justify-between items-center">
    <h1 className=" text-[1.3rem] font-normal">{pageTitle}</h1>
    <PrimaryButton
      btnName={btnText}
      onClick={onClick}
      form={form}
      path={path}
    />
  </div>
);
export default PageHeader;
