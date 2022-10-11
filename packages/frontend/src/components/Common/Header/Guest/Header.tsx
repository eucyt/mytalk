import Link from "next/link";
import React from "react";

import ApplicationLogo from "@/components/Common/ApplicationLogo";

const Header: React.VFC = () => {
  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <a>
                  <ApplicationLogo className="block h-10 w-auto fill-current" />
                </a>
              </Link>
            </div>
            <div className="ml-4 flex items-center">
              <p className="text-sm font-medium">MyTalk</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
