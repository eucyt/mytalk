/* eslint-disable */
import React from "react";

interface Props {
  talkId: number;
}
const TalkHeader: React.VFC<Props> = (props) => (
  <>
    <div className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute right-0 bottom-0 text-green-500">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt=""
            className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="mt-1 flex items-center text-2xl">
            <span className="mr-3 text-gray-700">Anderson Vanhron</span>
          </div>
          <span className="text-lg text-gray-600">Junior Developer</span>
        </div>
      </div>
    </div>
  </>
);

export default TalkHeader;
