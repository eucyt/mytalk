import React from "react";

interface Props {
  children?: React.ReactNode;
}
const Content: React.FC<Props> = (props) => {
  return (
    <div className="h-full w-full bg-white px-6 py-4 sm:max-w-lg sm:rounded-lg sm:shadow-md md:max-w-xl lg:max-w-2xl">
      {props.children}
    </div>
  );
};

export default Content;
