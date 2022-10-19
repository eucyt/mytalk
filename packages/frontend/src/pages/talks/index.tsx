import React, { useEffect, useState } from "react";

import Content from "@/components/Common/Content";
import AuthLayoutWithHeaderFooter from "@/components/Common/Layouts/AuthLayoutWithHeaderFooter";
import TalkList from "@/components/Talk/TalkList";
import talkAPI from "@/lib/api/talk";
import { Talk } from "@/lib/type/talkType";
import { User } from "@/lib/type/userType";

const Index = () => {
  const [talks, setTalks] = useState<Talk[]>();
  const [user, setUser] = useState<User>();

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
    <AuthLayoutWithHeaderFooter
      setUser={setUser}
      user={user}
      title="MyTalk - Talk"
    >
      <Content>
        <TalkList talks={talks} username={user?.displayName} />
      </Content>
    </AuthLayoutWithHeaderFooter>
  );
};

export default Index;
