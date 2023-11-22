import React from "react";
import Link from "next/link";

import { ListResponse } from "@/types";

const ListItem = ({
  list
} : {
  list: ListResponse
}) => {
  return (
    <Link key={list.id} className="flex-between" href={`/lists/${list.id}`}>
      <div>{list.emoji ? list.emoji : "📋"} {list.name}</div>
    </Link>
  )
}

export default ListItem