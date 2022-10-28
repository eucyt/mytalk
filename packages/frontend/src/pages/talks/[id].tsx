import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import talkAPI from "@/lib/api/talk";
import { Talk } from "@/lib/type/talkType";

const Index = () => {
  const router = useRouter();
  const { id: talkId } = router.query;
  const { postMessage, getMessages } = talkAPI;

  // TODO: many connect happened
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState<string>();
  const [messages, setMessages] = useState<Talk>();

  const sendMessage = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (typeof talkId == "string" && message) {
        const { status } = await postMessage(
          window.localStorage.getItem("accessToken")!,
          talkId,
          message
        );
        console.log(status);
        if (status === 201) {
          setMessage(undefined);
        }
      }
    },
    [message, postMessage, talkId]
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      socket.emit("join", talkId);
    });
    socket.on("newMessage", (message) => {
      console.log(message);
    });
  }, [socket, talkId]);

  useEffect(() => {
    if (typeof talkId != "string") {
      return;
    }

    void (async () => {
      const { status, data } = await getMessages(
        window.localStorage.getItem("accessToken")!,
        talkId
      );
      if (status === 200) {
        setMessages(data);
      }
    })();
  });

  return (
    <AuthLayout title="MyTalk - Message">
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <p>Coming Soon...</p>
        {/*<TalkHeader talkId={Number(id)} />*/}
        {/*<MessageList />*/}
        {/*<SendingMessageArea />*/}
        <div>
          {messages?.messages.map((message) => (
            <div>{message.content}</div>
          ))}
        </div>

        <form onSubmit={sendMessage}>
          <input
            type="text"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Index;
