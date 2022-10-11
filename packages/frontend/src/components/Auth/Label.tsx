import React from "react";

interface Props {
  className?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}

const Label: React.VFC<Props> = (props: Props) => (
  <label
    className={`${props.className} block text-sm font-medium text-gray-700`}
    htmlFor={props.htmlFor}
  >
    {props.children}
  </label>
);

export default Label;
