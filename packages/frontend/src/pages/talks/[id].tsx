// import { useRouter } from "next/router";
import React from "react";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";

const Index = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <AuthLayout title="MyTalk - Message">
      <div className="flex h-screen flex-1 flex-col justify-between sm:p-6">
        <p>Coming Soon...</p>
        {/*<TalkHeader talkId={Number(id)} />*/}
        {/*<MessageList />*/}
        {/*<SendingMessageArea />*/}
      </div>
    </AuthLayout>
  );
};

export default Index;
