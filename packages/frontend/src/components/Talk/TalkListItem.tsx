import React from "react";

import PersonIcon from "@/components/Common/PersonIcon";

interface Props {
  id: number;
  talkMemberNames: string[];
  isBottom: boolean;
}
const TaskListItem: React.VFC<Props> = (props) => (
  <>
    <a
      href={`/talks/${props.id}`}
      className={
        "flex w-full border-b-gray-300 p-6 transition duration-150 ease-in-out hover:bg-gray-100 " +
        (props.isBottom ? "" : "border-b")
      }
    >
      <PersonIcon />
      <p>{props.talkMemberNames.join(", ")}</p>
    </a>
  </>
);

export default TaskListItem;
