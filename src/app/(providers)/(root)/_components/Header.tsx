"use client";
import Link from "next/link";
import React from "react";
import supabase from "../../../../supabase/client";
import { useAuthStore } from "../../../../zustand/auth.store";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 되었습니다");

    router.push("/log-in");
  };

  console.log(isLoggedIn);
  return (
    <header className="border-b border-black flex px-10 py-4 justify-between items-center">
      <Link href={"/"} className=" text-2xl font-bold text-black">
        TODO
      </Link>
      <nav className="flex gap-x-3">
        {isAuthInitialized ? (
          isLoggedIn ? (
            <>
              <Link href={"/profile"}>내 정보</Link>
              <button onClick={handleClickLogOut}>로그아웃</button>
            </>
          ) : (
            <>
              <Link href={"/log-in"}>로그인</Link>
              <Link href={"/sign-up"}>회원가입</Link>
            </>
          )
        ) : null}
      </nav>
    </header>
  );
}

export default Header;
