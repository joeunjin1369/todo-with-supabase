import api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ComponentProps } from "react";

interface todoList {
  created_at: string;
  id: number;
  isComplete: boolean;
  title: string;
  userId: string;
}

function EditTodoListForm({ todoList }: { todoList: todoList }) {
  const queryClient = useQueryClient();
  const { mutate: deleteTodoList } = useMutation({
    mutationFn: api.todoLists.deleteTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });

  const handleClickDelete: ComponentProps<"button">["onClick"] = async (e) => {
    e.stopPropagation();

    const isDelete = confirm("해당 목록을 삭제할 건가요?");
    if (!isDelete) return;

    deleteTodoList(todoList);

    alert("삭제되었습니다.");
  };

  return (
    <div className="mx-4 py-2 mt-1 border-t">
      <small className="block  pt-3">목록을 수정할 수 있어요</small>
      <div className="flex mb-5 pt-2 justify-between">
        <div className="flex">
          <input
            placeholder="수정 내용"
            className=" block px-5 py-1 border border-black"
          />
          <button className="bg-black ml-3 text-sm font-bold text-white py-1 px-4">
            저장
          </button>
        </div>
        <button
          onClick={handleClickDelete}
          className="bg-red-500 ml-3 text-sm font-bold text-white py-1 px-4"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default EditTodoListForm;
