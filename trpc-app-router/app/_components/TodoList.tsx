"use client";

import React from "react";
import { trpc } from "../_trpc/client";

const TodoList = () => {
  const todos = trpc.getTodos.useQuery();
  return <div>
    {todos.isFetching ? <div>Loading...</div> : <div>{JSON.stringify(todos.data)}</div>}
  </div>;
};

export default TodoList;
