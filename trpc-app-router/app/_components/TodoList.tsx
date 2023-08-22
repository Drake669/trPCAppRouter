"use client";

import React, { useState } from "react";
import { trpc } from "../_trpc/client";

const TodoList = () => {
  const todos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation();
  const [todo, setTodo] = useState({
    name: "",
    content: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      addTodo.mutate(todo);
      setTodo({ name: "", content: "" });
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex space-y-2">
          <div>
            <input
              type="text"
              name="name"
              value={todo.name}
              onChange={(e) => {
                setTodo({ ...todo, name: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="content"
              value={todo.content}
              onChange={(e) => {
                setTodo({ ...todo, content: e.target.value });
              }}
            />
          </div>
          <button type="submit" className="bg-blue-400 p-2 rounded">
            Create Todo
          </button>
        </div>
      </form>
      {todos.isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>{JSON.stringify(todos.data)}</div>
      )}
    </div>
  );
};

export default TodoList;
