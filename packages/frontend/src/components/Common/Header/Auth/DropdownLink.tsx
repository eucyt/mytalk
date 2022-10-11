import { Menu } from "@headlessui/react";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

interface DropdownLinkProps {
  children?: React.ReactNode;
  href: string;
}

const DropdownLink: React.VFC<DropdownLinkProps> = ({
  children,
  href,
}: DropdownLinkProps) => (
  <Menu.Item>
    {({ active }) => (
      <Link href={href}>
        <a
          className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 ${
            active ? "bg-gray-100" : ""
          } transition duration-150 ease-in-out focus:outline-none`}
        >
          {children}
        </a>
      </Link>
    )}
  </Menu.Item>
);

interface DropdownButtonProps {
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}

export const DropdownButton: React.VFC<DropdownButtonProps> = ({
  children,
  onClick,
  active = false,
}) => (
  <Menu.Item>
    {({ active }) => (
      <button
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
        onClick={onClick}
        className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 ${
          active ? "bg-gray-100" : ""
        } transition duration-150 ease-in-out focus:outline-none`}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownLink;
