import React, { useEffect, useState } from "react";

import Content from "@/components/Common/Content";
import AuthLayoutWithHeaderFooter from "@/components/Common/Layouts/AuthLayoutWithHeaderFooter";
import TalkInvitationList from "@/components/TalkInvitation/TalkInvitationList";
import talkInvitationAPI from "@/lib/api/talkInvitation";
import { TaskInvitation } from "@/lib/type/taskInvitationType";
import { Me } from "@/lib/type/userType";

const Index: React.FC = () => {
  const [user, setUser] = useState<Me>();
  const [invitations, setInvitations] = useState<TaskInvitation[]>();
  const { getInvitedInvitations } = talkInvitationAPI;

  useEffect(() => {
    void (async () => {
      const { status, data } = await getInvitedInvitations(
        window.localStorage.getItem("accessToken")!
      );
      if (status === 200) {
        setInvitations(data.invitations);
      }
    })();
  }, [getInvitedInvitations]);

  return (
    <AuthLayoutWithHeaderFooter
      setUser={setUser}
      user={user}
      title="MyTalk - Invitations"
    >
      <Content>
        <TalkInvitationList invitations={invitations} />
      </Content>
    </AuthLayoutWithHeaderFooter>
  );
};

export default Index;
