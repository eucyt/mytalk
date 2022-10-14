import React from "react";

const InviteButton = () => {
  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default InviteButton;
