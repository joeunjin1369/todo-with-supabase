import supabase from "@/supabase/client";
import { Database } from "../../database.types";

interface todoList {
  created_at: string;
  id: number;
  isComplete: boolean;
  title: string;
  userId: string;
}

async function getTodoLists() {
  const { data } = await supabase.auth.getUser();
  const user = data.user!;

  const response = await supabase
    .from("todoLists")
    .select("*")
    .eq("userId", user.id);
  const todoLists = response.data;

  return todoLists;
}

async function addTodoList(
  data: Database["public"]["Tables"]["todoLists"]["Insert"]
) {
  await supabase.from("todoLists").insert(data);
}


async function deleteTodoList(todoList: todoList) {
  await supabase.from("todoLists").delete().eq("id", todoList.id);
}

async function toggleIsCompleted(todoList: todoList) {
  await supabase
    .from("todoLists")
    .update({ isComplete: !todoList.isComplete })
    .eq("id", todoList.id);
}

const todoListsAPI = {
  getTodoLists,
  addTodoList,
  deleteTodoList,
  toggleIsCompleted,
};

export default todoListsAPI;
