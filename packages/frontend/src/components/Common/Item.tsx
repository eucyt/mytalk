import React from "react";

interface Props {
  link?: string;
  children?: React.ReactNode;
}

const Item: React.FC<Props> = (props) => {
  if (props.link !== undefined) {
    return (
      <a
        href={props.link}
        className="transition duration-150 ease-in-out hover:opacity-50"
      >
        <div className="relative flex flex-row items-center p-4">
          {props.children}
        </div>
      </a>
    );
  } else {
    return (
      <div className="relative flex flex-row items-center p-4">
        {props.children}
      </div>
    );
  }
};

export default Item;
