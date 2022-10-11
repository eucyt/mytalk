import { Menu } from "@headlessui/react";
import React from "react";

interface Props {
  align?: "left" | "top" | "right";
  width?: string;
  contentClasses?: string;
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

const Dropdown: React.VFC<Props> = ({
  align = "right",
  width = "w-48",
  contentClasses = "py-1 bg-white",
  trigger,
  children,
}) => {
  let alignmentClasses: string;

  switch (align) {
    case "left":
      alignmentClasses = "origin-top-left left-0";
      break;
    case "top":
      alignmentClasses = "origin-top";
      break;
    case "right":
    default:
      alignmentClasses = "origin-top-right right-0";
      break;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button>{trigger}</Menu.Button>
      <div
        className={`absolute z-50 mt-2 ${width} rounded-md shadow-lg ${alignmentClasses}`}
      >
        <Menu.Items
          /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */
          className={`rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${contentClasses}`}
        >
          {children}
        </Menu.Items>
      </div>
    </Menu>
  );
};

export default Dropdown;
