import React, { useState } from "react";
import EditTodoListForm from "./EditTodoListForm";
import { cx } from "class-variance-authority";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

interface todoList {
  created_at: string;
  id: number;
  isComplete: boolean;
  title: string;
}

function Todo({ todoList }: { todoList: todoList }) {
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: toggleIsCompleted } = useMutation({
    mutationFn: api.todoLists.toggleIsCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  const handleClickTodo = async (todoList: todoList) => {
    toggleIsCompleted(todoList);
  };

  const handleClickEdit = () => {
    if (todoList.isComplete)
      return alert("이미 완료된 목록은 수정할 수 없어요");

    setIsEdit(!isEdit);
  };

  return (
    <li key={todoList.id} className="border border-black mb-2">
      <label htmlFor={String(todoList.id)} className="px-4 py-2 w-full flex">
        <input
          onChange={() => handleClickTodo(todoList)}
          type="checkbox"
          id={String(todoList.id)}
          checked={todoList.isComplete}
        />
        <div className="flex w-full justify-between">
          <p
            className={cx(
              todoList.isComplete ? "text-gray-400 line-through ml-4" : "ml-4"
            )}
          >
            {todoList.title}
          </p>
          <button
            onClick={handleClickEdit}
            className={cx(
              todoList.isComplete
                ? "line-through text-black/30"
                : "text-black/30"
            )}
          >
            {isEdit ? "닫기" : "수정"}
          </button>
        </div>
      </label>
      {isEdit && <EditTodoListForm todoList={todoList} />}
    </li>
  );
}

export default Todo;
