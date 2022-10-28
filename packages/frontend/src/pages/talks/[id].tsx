import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import talkAPI from "@/lib/api/talk";

const Index = () => {
  const router = useRouter();
  const { id: talkId } = router.query;
  const { postMessage } = talkAPI;
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState<string>();

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

  return (
    <AuthLayout title="MyTalk - Message">
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <p>Coming Soon...</p>
        {/*<TalkHeader talkId={Number(id)} />*/}
        {/*<MessageList />*/}
        {/*<SendingMessageArea />*/}
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
