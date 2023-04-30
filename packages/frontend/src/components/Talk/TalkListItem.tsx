import React from "react";

import Item from "@/components/Common/Item";
import { TalkListItem } from "@/lib/type/talkType";

interface Props {
  myId?: number;
  talk: TalkListItem;
}
const TaskListItem: React.VFC<Props> = (props) => {
  const memberWithoutMe = props.talk.users
    .map((member) => member)
    .filter((v) => v.id !== props.myId);

  return (
    <Item link={"/talks/" + props.talk.id.toString()}>
      {/*<div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">*/}
      {/*  TODO: latest message datetime*/}
      {/*</div>*/}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
        {memberWithoutMe.length !== 0 ? memberWithoutMe[0].displayName[0] : ""}
      </div>
      <div className="ml-3 flex w-4/5 grow flex-col">
        <div className="text-sm font-medium">
          {memberWithoutMe.length !== 0
            ? memberWithoutMe.map((member) => member.displayName).join(", ")
            : "No Member"}
        </div>
        <div className="max-w-full  truncate text-xs">
          {props.talk.latestMessage?.content}
        </div>
      </div>
      {/*<div className="ml-2 mb-1 shrink-0 self-end">*/}
      {/*  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">*/}
      {/*    3*/}
      {/* TODO: unread count */}
      {/*</span>*/}
      {/*</div>*/}
    </Item>
  );
};
export default TaskListItem;
