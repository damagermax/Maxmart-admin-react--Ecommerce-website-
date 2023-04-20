import React from "react";

const Search = () => {
  return (
    <div className="relative  w-full ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        id="input-group-1"
        onChange={({ target }) => {}}
        className="bg-white border border-gray-200 text-sm font-normal rounded-sm focus:ring-gray-500  focus:border-gray-500 block w-full pl-10 p-2 "
        placeholder="Search room"
      />
    </div>
  );
};

export default Search;
