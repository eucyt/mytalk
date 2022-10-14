import React from "react";

import MessageList from "@/components/Talk/MessegeList";
import SendingMessageArea from "@/components/Talk/SendingMessageArea";
import TalkHeader from "@/components/Talk/TalkHeader";

const Index = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <TalkHeader />
        <MessageList />
        <SendingMessageArea />
      </div>
    </>
  );
};

export default Index;
