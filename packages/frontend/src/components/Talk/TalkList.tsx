import React from "react";

import List from "@/components/Common/List";
import CreateTalkButton from "@/components/Talk/CreateTalkButton";
import TaskListItem from "@/components/Talk/TalkListItem";
import { Talk } from "@/lib/type/talkType";

interface Props {
  talks?: Talk[];
  username?: string;
}
const TalkList: React.FC<Props> = (props) => {
  return (
    <List
      header={
        <>
          <div className="text-xl font-semibold">Talks</div>
          {/* TODO: unread count */}
          {/*<div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">*/}
          {/*  5*/}
          {/*</div>*/}
        </>
      }
      items={props.talks?.map((talk, i) => {
        return (
          <TaskListItem
            id={talk.id}
            talkMemberNames={talk.users
              .map((user) => user.name)
              .filter((v) => v !== props.username)}
          />
        );
      })}
      outItems={
        <div className="absolute bottom-0 right-0 mr-2">
          <CreateTalkButton />
        </div>
      }
    />
  );
};

export default TalkList;
