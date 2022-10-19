import React from "react";

interface Props {
  id: number;
  talkMemberNames: string[];
}
const TaskListItem: React.VFC<Props> = (props) => (
  <a
    href={"/talks/" + props.id.toString()}
    className="transition duration-150 hover:opacity-50"
  >
    <div className="relative flex flex-row items-center p-4">
      {/*<div className="absolute right-0 top-0 mr-4 mt-3 text-xs text-gray-500">*/}
      {/*  TODO: latest message datetime*/}
      {/*</div>*/}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 font-bold text-pink-300">
        {props.talkMemberNames.length !== 0 ? props.talkMemberNames[0][0] : ""}
      </div>
      <div className="ml-3 flex w-4/5 grow flex-col">
        <div className="text-sm font-medium">
          {props.talkMemberNames.length !== 0
            ? props.talkMemberNames.join(", ")
            : "No Member"}
        </div>
        <div className="max-w-full  truncate text-xs">
          {/* TODO: latest message */}
          Good after noon! how can i help you? Good after noon! how can i help
          you? Good after noon! how can i help you? Good after noon! how can i
          help you?
        </div>
      </div>
      {/*<div className="ml-2 mb-1 shrink-0 self-end">*/}
      {/*  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">*/}
      {/*    3*/}
      {/* TODO: unread count */}
      {/*</span>*/}
      {/*</div>*/}
    </div>
  </a>
);

export default TaskListItem;
