import { useRouter } from "next/router";
import React from "react";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import MessageList from "@/components/Talk/MessegeList";
import SendingMessageArea from "@/components/Talk/SendingMessageArea";
import TalkHeader from "@/components/Talk/TalkHeader";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AuthLayout>
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <TalkHeader talkId={Number(id)} />
        <MessageList />
        <SendingMessageArea />
      </div>
    </AuthLayout>
  );
};

export default Index;
