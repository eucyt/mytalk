import Link from "next/link";
import React, { MouseEventHandler } from "react";

interface ResponsiveNavLinkProps {
  active: boolean;
  children?: React.ReactNode;
  href: string;
}

const ResponsiveNavLink: React.VFC<ResponsiveNavLinkProps> = ({
  active = false,
  children,
  href,
}: ResponsiveNavLinkProps) => (
  <Link href={href}>
    <a
      className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
        active
          ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800"
          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"
      }`}
    >
      {children}
    </a>
  </Link>
);

interface ResponsiveNavButtonProps {
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ResponsiveNavButton: React.VFC<ResponsiveNavButtonProps> = ({
  onClick,
  children,
}) => (
  <button
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    onClick={onClick}
    className="block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium leading-5 text-gray-600 transition duration-150 ease-in-out hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 focus:outline-none"
  >
    {children}
  </button>
);

export default ResponsiveNavLink;
