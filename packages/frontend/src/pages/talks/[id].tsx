import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import FullSizeLoading from "@/components/Common/FullSizeLoading";
import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import MessageList from "@/components/Talk/MessegeList";
import SendingMessageArea from "@/components/Talk/SendingMessageArea";
import TalkHeader from "@/components/Talk/TalkHeader";
import talkAPI from "@/lib/api/talk";
import { Message } from "@/lib/type/talkType";
import { Me, User } from "@/lib/type/userType";

// eslint-disable-next-line sonarjs/cognitive-complexity
const Index = () => {
  const router = useRouter();
  const { id: talkId } = router.query;

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getMessages } = talkAPI;

  const [messages, setMessages] = useState<Message[]>();
  const [members, setMembers] = useState<User[]>();
  const [user, setUser] = useState<Me>();

  useEffect(() => {
    if (!talkId) {
      return;
    }
    const socket = io("http://localhost:3000", {
      auth: { access_token: window.localStorage.getItem("accessToken")! },
    });
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

  useEffect(() => {
    if (isConnected && messages !== undefined) {
      setIsLoading(false);
    }
  }, [isConnected, messages]);

  return isLoading ? (
    <FullSizeLoading />
  ) : (
    <AuthLayout title="MyTalk - Message" setUser={setUser}>
      <div className="flex h-screen flex-1 flex-col justify-between p-2 sm:p-6">
        {/* HACK: Removing my name from member's names */}
        <TalkHeader
          talkMemberNamesWithoutMe={
            members
              ?.map((member) => member.displayName)
              .filter((v) => v !== user?.displayName) ?? []
          }
        />
        <MessageList messages={messages ?? []} myId={user?.id} />
        <SendingMessageArea talkId={talkId as string} />
      </div>
    </AuthLayout>
  );
};

export default Index;
