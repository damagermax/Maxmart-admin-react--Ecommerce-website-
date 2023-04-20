import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center h-[76%] my-auto  ">
      <div className="m-auto justify-center text-center">
        <h1 className=" text-8xl font-bold text-gray-200">Oops! Error 404</h1>
        <h2 className=" text-4xl mt-8 mb-4 font-medium">Page Not Found</h2>
        <p className=" text-l text-gray-600">
          We can't seem to find the page you're looking for.
        </p>
        <Link
          to="/"
          className="mt-4 rounded-sm hover:text-black hover:bg-yellow-500 bg-yellow-400 py-2 px-5 block w-fit mx-auto"
        >
          Go To Home Page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
