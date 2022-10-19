import React, { useState } from "react";

import Content from "@/components/Common/Content";
import AuthLayoutWithHeaderFooter from "@/components/Common/Layouts/AuthLayoutWithHeaderFooter";
import TalkInvitationList from "@/components/TalkInvitation/TalkInvitationList";
import { User } from "@/lib/type/userType";

const Index: React.FC = () => {
  const [user, setUser] = useState<User>();
  return (
    <AuthLayoutWithHeaderFooter
      setUser={setUser}
      user={user}
      title="MyTalk - Invitations"
    >
      <Content>
        <TalkInvitationList />
      </Content>
    </AuthLayoutWithHeaderFooter>
  );
};

export default Index;
