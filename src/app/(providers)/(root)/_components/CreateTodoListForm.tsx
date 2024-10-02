import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import { Database } from "../../../../../database.types";
import supabase from "@/supabase/client";

function CreateTodoListForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { mutate: addTodoList, isPending: isAddOnProcess } = useMutation<
    unknown,
    Error,
    Database["public"]["Tables"]["todoLists"]["Insert"]
  >({
    mutationFn: (data) => api.todoLists.addTodoList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      alert("추가되었습니다");
      setTitle("");
    },
  });

  const handleClickAddTodoList = async () => {
    const { data } = await supabase.auth.getUser();
    const userId = data.user!.id;

    if (!title) return alert("내용을 작성해주세요");

    const todo: Database["public"]["Tables"]["todoLists"]["Insert"] = {
      title,
      userId,
    };

    addTodoList(todo);
  };

  return (
    <>
      <small className="block mt-10 ">목록을 추가할 수 있어요</small>
      <div className="flex justify-start mt-2">
        <input
          placeholder="추가 내용"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" block px-5 py-1 border border-black"
        />
        <button
          onClick={handleClickAddTodoList}
          disabled={isAddOnProcess}
          className="bg-black px-3 text-sm font-bold ml-3 text-white"
        >
          추가
        </button>
      </div>
    </>
  );
}

export default CreateTodoListForm;
