import React from "react";

interface Props {
  logo?: React.ReactNode;
  children?: React.ReactNode;
}

const AuthCard: React.VFC<Props> = (props: Props) => (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    <div>{props.logo}</div>

    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
      {props.children}
    </div>
  </div>
);

export default AuthCard;
