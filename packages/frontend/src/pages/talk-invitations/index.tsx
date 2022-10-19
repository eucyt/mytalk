import React, { useState } from "react";

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
      <div className="flex h-[calc(100vh-64px)] flex-col items-center bg-gray-100 p-2 sm:p-12">
        <div className="h-full w-full bg-white px-6 py-4 sm:max-w-lg sm:rounded-lg sm:shadow-md md:max-w-xl lg:max-w-2xl">
          <TalkInvitationList />
        </div>
      </div>
    </AuthLayoutWithHeaderFooter>
  );
};

export default Index;
