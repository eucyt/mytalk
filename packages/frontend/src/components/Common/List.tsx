import React from "react";

interface Props {
  items?: React.ReactNode;
  header?: React.ReactNode;
  outItems?: React.ReactNode;
}

const List: React.FC<Props> = (props) => {
  return (
    <div className="flex h-full w-full shrink-0 flex-col p-4 antialiased">
      {props.header ? (
        <div className="flex flex-row items-center">{props.header}</div>
      ) : (
        <></>
      )}

      <div className="relative h-full overflow-hidden pt-2">
        <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto">
          {props.items}
        </div>
        {props.outItems}
      </div>
    </div>
  );
};

export default List;
