"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../../../supabase/client";
import Link from "next/link";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClickLogIn = async () => {
    if (!email.includes("@") || !email.includes("."))
      return alert("올바른 이메일 주소를 입력해 주세요");
    if (!password) return alert("비밀번호를 입력해 주세요");

    const result = await supabase.auth.signInWithPassword({ email, password });
    console.log(result);

    alert("로그인 되었습니다.");

    router.push("/");
  };

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
    })();
  }, []);

  return (
    <div>
      <div className="p-10 border max-w-screen-sm m-auto border-black  text-center">
        <h1 className="text-center mb-5 text-black font-bold text-2xl ">
          로그인
        </h1>
        <div className="text-left mt-5">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            className="w-full mt-2 border px-4 py-4 border-black/50 hover:border-black"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-left mt-5">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            className=" w-full border mt-2 px-4 py-4 border-black/50 hover:border-black"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleClickLogIn}
          className="mt-10 w-6/12 bg-black py-3 text-white font-bold "
        >
          로그인
        </button>
      </div>

      <small className="max-w-screen-sm m-auto block mt-5 text-black/50">
        로그인 후 서비스 이용 가능합니다. 아직 회원이 아니신가요?
        <Link href={"/sign-up"} className="underline ml-2 text-black">
          회원가입하러 가기
        </Link>
      </small>
    </div>
  );
}

export default LogInPage;
