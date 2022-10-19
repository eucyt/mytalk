import { useRouter } from "next/router";
import React from "react";

import Button from "@/components/Common/Button";
import Item from "@/components/Common/Item";
import List from "@/components/Common/List";
import talkInvitationAPI from "@/lib/api/talkInvitation";
import { TaskInvitation } from "@/lib/type/taskInvitationType";

interface Props {
  invitations?: TaskInvitation[];
}

const TalkInvitationList: React.FC<Props> = (props) => {
  const { accept } = talkInvitationAPI;
  const router = useRouter();

  const onSubmit = (
    event: { preventDefault: () => void },
    invitationId: number
  ) => {
    event.preventDefault();
    void (async () => {
      const { status, data } = await accept(
        window.localStorage.getItem("accessToken")!,
        invitationId
      );
      if (status === 201) {
        await router.push(`/talks/${data.talkId}`);
      }
    })();
  };
  return (
    <List
      header={<div className="text-xl font-semibold">Invitations</div>}
      items={
        props.invitations?.length !== 0 ? (
          props.invitations?.map((invitation) => {
            return (
              <form onSubmit={(e) => onSubmit(e, invitation.id)}>
                <Item>
                  <div className="text-xl font-medium">
                    From: {invitation.inviterName}
                  </div>
                  <Button className="absolute right-10">ACCEPT</Button>
                </Item>
              </form>
            );
          })
        ) : (
          <Item>
            <p>No Invitations...</p>
          </Item>
        )
      }
    />
  );
};

export default TalkInvitationList;
