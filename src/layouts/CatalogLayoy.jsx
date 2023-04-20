import React from "react";
import { Outlet } from "react-router-dom";

const CatalogLayoy = () => {
  return (
    <div>
      CatalogLayoy
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CatalogLayoy;
