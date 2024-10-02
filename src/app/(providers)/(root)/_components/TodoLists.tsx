"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Todo from "./Todo";
import api from "@/api/api";

function TodoLists() {
  const { data: todoLists, isLoading } = useQuery({
    queryKey: ["todoLists"],
    queryFn: api.todoLists.getTodoLists,
  });

  return (
    <ul className="mt-10">
      {isLoading && <p>리스트를 불러오는 중...</p>}

      {todoLists?.length === 0 && (
        <p className="text-black/30">목록을 추가해보세요</p>
      )}

      {todoLists?.map((todoList) => (
        <Todo key={String(todoList.id)} todoList={todoList} />
      ))}
    </ul>
  );
}

export default TodoLists;
