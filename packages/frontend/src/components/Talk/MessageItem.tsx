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
      "rounded-lg p-3" +
      (props.isMine ? " col-start-6 col-end-13" : " col-start-1 col-end-8")
    }
  >
    <div
      className={
        "flex flex-row items-center" +
        (props.isMine ? " flex-row-reverse justify-start" : "")
      }
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500">
        {props.senderName[0] ?? ""}
      </div>
      <div className="mx-3">
        <div className="text-right">{props.senderName}</div>
        <div className="relative  rounded-xl bg-white py-2 px-4 text-sm shadow">
          <div>{props.content}</div>
        </div>
      </div>
    </div>
  </div>
);

export default MessageItem;
