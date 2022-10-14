import Link from "next/link";
import React from "react";

interface Props {
  active: boolean;
  children?: React.ReactNode;
  href: string;
}

const NavLink: React.VFC<Props> = ({
  active = false,
  children,
  href,
}: Props) => (
  <Link href={href}>
    <a
      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
        active
          ? "border-indigo-400 text-gray-900 focus:border-indigo-700"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700"
      }`}
    >
      {children}
    </a>
  </Link>
);

export default NavLink;
