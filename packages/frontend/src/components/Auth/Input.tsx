import React, { ChangeEventHandler } from "react";

interface Props {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const Input: React.VFC<Props> = ({
  id,
  type,
  name,
  value,
  className,
  onChange,
  autoComplete,
  required = false,
  autoFocus = false,
  disabled = false,
}: Props) => (
  <input
    id={id}
    type={type}
    name={name}
    value={value}
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    onChange={onChange}
    autoComplete={autoComplete}
    required={required}
    autoFocus={autoFocus}
    disabled={disabled}
    /* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */
    className={`${className} rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
  />
);

export default Input;
