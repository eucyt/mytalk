/* eslint-disable */
import React from "react";
import { Message } from "@/lib/type/talkType";
import MessageItem from "@/components/Talk/MessageItem";

interface Props {
  myId?: number;
  messages: Message[];
}

const MessageList: React.FC<Props> = (props) => (
  <>
    <div className="h-full overflow-hidden py-4">
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-12 gap-y-2">
          {props.messages.map((message) => (
            <MessageItem
              content={message.content}
              isMine={message.senderId === props.myId}
              senderName={message.senderName}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default MessageList;
