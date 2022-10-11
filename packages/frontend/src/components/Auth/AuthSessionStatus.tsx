import React from "react";

interface Props {
  status: string | null;
  className?: string;
}

const AuthSessionStatus: React.VFC<Props> = (props: Props) => (
  <>
    {props.status && (
      <div className={`${props.className} text-sm font-medium text-green-600`}>
        {props.status}
      </div>
    )}
  </>
);

export default AuthSessionStatus;
