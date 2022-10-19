import React from "react";

import CreateTalkButton from "@/components/Talk/CreateTalkButton";
import TaskListItem from "@/components/Talk/TalkListItem";
import { Talk } from "@/lib/type/talkType";

interface Props {
  talks?: Talk[];
  username?: string;
}
const TalkList: React.FC<Props> = (props) => {
  return (
    <div className="flex h-full w-full shrink-0 flex-col p-4 antialiased">
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold">Talks</div>
        {/* TODO: unread count */}
        {/*<div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">*/}
        {/*  5*/}
        {/*</div>*/}
      </div>
      <div className="relative h-full overflow-hidden pt-2 ">
        <div className="-mx-4 flex h-full flex-col divide-y overflow-y-auto">
          {props.talks?.map((talk, i) => {
            return (
              <TaskListItem
                id={talk.id}
                talkMemberNames={talk.users
                  .map((user) => user.name)
                  .filter((v) => v !== props.username)}
              />
            );
          })}
        </div>
        <div className="absolute bottom-0 right-0 mr-2">
          <CreateTalkButton />
        </div>
      </div>
    </div>
  );
};

export default TalkList;
