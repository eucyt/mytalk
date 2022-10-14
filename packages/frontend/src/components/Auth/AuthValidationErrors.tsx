import React from "react";

interface Props {
  errors: string[];
  className?: string;
}

const AuthValidationErrors: React.VFC<Props> = (props: Props) => (
  <>
    {props.errors.length > 0 && (
      <div className={props.className}>
        <div className="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>

        <ul className="mt-3 list-inside list-disc text-sm text-red-600">
          {props.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default AuthValidationErrors;
