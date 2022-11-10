import React, { useCallback, useState } from "react";

import talkAPI from "@/lib/api/talk";

interface Props {
  talkId: string;
}

const SendingMessageArea: React.FC<Props> = (props) => {
  const [message, setMessage] = useState<string>();
  const { postMessage } = talkAPI;

  const sendMessage = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (message) {
        const { status } = await postMessage(
          window.localStorage.getItem("accessToken")!,
          props.talkId,
          message
        );
        console.log(status);
        if (status === 201) {
          setMessage(undefined);
        }
      }
    },
    [message, postMessage, props.talkId]
  );

  return (
    <form onSubmit={sendMessage}>
      <div className="flex flex-row items-center">
        <div className="flex h-12 w-full flex-row items-center rounded-3xl border px-2">
          <div className="w-full">
            <input
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              type="text"
              className="flex h-10 w-full items-center border border-none border-transparent text-sm focus:ring-0"
              placeholder="Type your message...."
            />
          </div>
          {/* TODO: send files */}
          {/*<div className="flex flex-row">*/}
          {/*  <button className="flex h-10 w-8 items-center justify-center text-gray-400">*/}
          {/*    <svg*/}
          {/*      className="h-5 w-5"*/}
          {/*      fill="none"*/}
          {/*      stroke="currentColor"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"*/}
          {/*      ></path>*/}
          {/*    </svg>*/}
          {/*  </button>*/}
          {/*  <button className="ml-1 mr-2 flex h-10 w-8 items-center justify-center text-gray-400">*/}
          {/*    <svg*/}
          {/*      className="h-5 w-5"*/}
          {/*      fill="none"*/}
          {/*      stroke="currentColor"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"*/}
          {/*      ></path>*/}
          {/*    </svg>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
        <div className="ml-6">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-indigo-800 hover:bg-gray-300"
            type="submit"
          >
            <svg
              className="-mr-px h-5 w-5 rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendingMessageArea;
