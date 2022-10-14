import React from "react";

interface Props {
  type?: "button" | "reset" | "submit";
  className?: string;
  children: React.ReactNode;
}

const Button: React.VFC<Props> = ({ type = "submit", className, children }) => (
  <button
    type={type}
    className={`${className} inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 focus:border-gray-900 focus:outline-none focus:ring active:bg-gray-900 disabled:opacity-25`}
  >
    {children}
  </button>
);

export default Button;
