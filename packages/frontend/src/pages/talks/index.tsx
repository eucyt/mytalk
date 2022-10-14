import Head from "next/head";
import React, { useEffect, useState } from "react";

import AuthLayout from "@/components/Common/Layouts/AuthLayoutWithHeaderFooter";
import TaskListItem from "@/components/Talk/TalkListItem";
import talkAPI from "@/lib/api/talk";
import { Talk } from "@/lib/type/talkType";

const Index = () => {
  const [talks, setTalks] = useState<Talk[]>();

  useEffect(() => {
    void (async () => {
      const { data, status } = await talkAPI.getTalks(
        window.localStorage.getItem("accessToken")!
      );
      if (status === 200) {
        setTalks(data.talks);
      }
    })();
  }, []);

  return (
    <AuthLayout>
      <Head>
        <title>MyTalk - Talk</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center bg-gray-100 sm:justify-center sm:pt-6">
        <ul className="w-full overflow-hidden px-6 py-4 sm:mt-6 sm:max-w-md sm:rounded-lg sm:bg-white sm:shadow-md">
          {talks?.map((talk, i) => {
            return (
              <li key={talk.id}>
                <TaskListItem
                  id={talk.id}
                  talkMemberNames={talk.users.map((user) => user.name)}
                  isBottom={talks.length - 1 === i}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </AuthLayout>
  );
};

export default Index;
