/* eslint-disable */
import React from "react";
import { Message } from "@/lib/type/talkType";

interface Props {
  isMine: boolean;
  senderName: string;
  content: string;
}

const MessageItem: React.FC<Props> = (props) => (
  <div
    className={
      "rounded-lg sm:p-3 py-3" +
      (props.isMine
        ? " col-start-2 sm:col-start-4 xl:col-start-6 col-end-13"
        : " col-start-1 xl:col-end-8 sm:col-end-10 col-end-12")
    }
  >
    <div
      className={
        "flex flex-row items-center" +
        (props.isMine ? " flex-row-reverse justify-start" : "")
      }
    >
      <div
        className={
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full" +
          (props.isMine ? " bg-indigo-500" : "  bg-pink-500")
        }
      >
        {props.senderName[0] ?? ""}
      </div>
      <div className="mx-3">
        <div
          className={
            "mx-2 text-sm " + (props.isMine ? "text-right" : "text-left")
          }
        >
          {props.senderName}
        </div>
        <div className="relative  rounded-xl bg-white py-2 px-4 text-sm shadow">
          <div>{props.content}</div>
        </div>
      </div>
    </div>
  </div>
);

export default MessageItem;
