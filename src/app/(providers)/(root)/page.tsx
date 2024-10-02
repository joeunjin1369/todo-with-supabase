"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../zustand/auth.store";
import TodoLists from "./_components/TodoLists";

import { useEffect } from "react";
import CreateTodoListForm from "./_components/CreateTodoListForm";

function HomePage() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  useEffect(() => {
    if (isAuthInitialized && !isLoggedIn) {
      router.replace("/log-in");
      //push를 사용하면 뒤로가기 버튼을 눌렀을 때, 다시 이전 페이지로 돌아간다.
      //replace를 사용하면 뒤로가기 버튼을 눌러도 이전 페이지로 돌아가지 못한다.
    }
  }, [isAuthInitialized, isLoggedIn, router]);

  if (!isAuthInitialized || !isLoggedIn) return null;
  // 확인되기 전에는 return null을 보여주면 저 아래 내용이 안보임

  return (
    <div>
      <h1 className="text-black font-bold text-3xl  ">Todo Lists</h1>
      <CreateTodoListForm />
      <hr className="mt-10" />
      <TodoLists />
    </div>
  );
}

export default HomePage;
