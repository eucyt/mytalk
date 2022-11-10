/* eslint-disable */
import React from "react";

interface Props {
  talkMemberNamesWithoutMe: string[];
}
const TalkHeader: React.VFC<Props> = (props) => (
  <>
    <div className="flex flex-row items-center rounded-2xl py-4 sm:px-6 px-3 shadow">
      <a
        href="/talks"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 mr-3"
      >
        <span>
          <svg
            className="h-5 w-5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#000"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="14 18 8 12 14 6 14 6" />
          </svg>
        </span>
      </a>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-pink-100">
        {props.talkMemberNamesWithoutMe.length !== 0
          ? props.talkMemberNamesWithoutMe[0][0]
          : ""}
      </div>

      <div className="ml-3 flex flex-col">
        <div className="text-sm font-semibold">
          {props.talkMemberNamesWithoutMe.length !== 0
            ? props.talkMemberNamesWithoutMe.join(", ")
            : "No Member"}
        </div>
      </div>

      {/* TODO: talk setting */}
      {/*<div className="ml-auto">*/}
      {/*  <ul className="flex flex-row items-center space-x-2">*/}
      {/*    <li>*/}
      {/*      <a*/}
      {/*        href="#"*/}
      {/*        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200"*/}
      {/*      >*/}
      {/*        <span>*/}
      {/*          <svg*/}
      {/*            className="h-5 w-5"*/}
      {/*            fill="none"*/}
      {/*            stroke="currentColor"*/}
      {/*            viewBox="0 0 24 24"*/}
      {/*            xmlns="http://www.w3.org/2000/svg"*/}
      {/*          >*/}
      {/*            <path*/}
      {/*              strokeLinecap="round"*/}
      {/*              strokeLinejoin="round"*/}
      {/*              strokeWidth="2"*/}
      {/*              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"*/}
      {/*            ></path>*/}
      {/*          </svg>*/}
      {/*        </span>*/}
      {/*      </a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  </>
);

export default TalkHeader;
