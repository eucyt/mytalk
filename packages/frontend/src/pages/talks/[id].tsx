import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import talkAPI from "@/lib/api/talk";
import { Message, UserInTalk } from "@/lib/type/talkType";

const Index = () => {
  const router = useRouter();
  const { id: talkId } = router.query;

  const [, setIsConnected] = useState(false);
  const { postMessage, getMessages } = talkAPI;

  const [message, setMessage] = useState<string>();
  const [messages, setMessages] = useState<Message[]>();
  const [, setMembers] = useState<UserInTalk[]>();

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
    if (!talkId) {
      return;
    }
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("socket connected");
      socket.emit("join", talkId);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("newMessage", (receivedMessage: Message) => {
      if (messages) {
        const newMessages = [...messages, receivedMessage];
        setMessages(newMessages);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newMessage");
    };
    // TODO: messageを受信してmessagesに追加する際、depsにmessagesを追加していないと
    //  2回目以降の受信で新しいmessagesを使えず、一つ前のmessageがなかったことになってしまうが、
    //  depsに追加すると受信のたびにsocketが再接続する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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
        setMessages(data.messages);
        setMembers(data.users);
      }
    })();
  }, [getMessages, talkId]);

  return (
    <AuthLayout title="MyTalk - Message">
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <p>Coming Soon...</p>
        {/*<TalkHeader talkId={Number(id)} />*/}
        {/*<MessageList />*/}
        {/*<SendingMessageArea />*/}
        <div>
          {messages?.map((message) => (
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
