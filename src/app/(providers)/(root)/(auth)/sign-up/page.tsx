"use client";

import React, { useState } from "react";
import supabase from "../../../../../supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignUp = async () => {
    if (!email.includes("@") && !email.includes("."))
      return alert("올바른 이메일 주소를 입력해주세요");
    if (password.length < 5)
      return alert("비밀번호는 5자 이상으로 작성해주세요");
    if (!password) return alert("비밀번호를 입력해주세요");

    const result = await supabase.auth.signUp({ email, password });

    console.log(result);

    alert("회원가입을 축하합니다. \n로그인 후 메인페이지로 이동합니다.");

    router.push("/");
  };

  return (
    <>
      <div className="p-10 border max-w-screen-sm m-auto border-black  text-center">
        <h1 className="text-center mb-5 text-black font-bold text-2xl ">
          회원가입
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
          onClick={handleClickSignUp}
          className=" mt-10 w-6/12 bg-black py-3 text-white font-bold "
        >
          가입하기
        </button>
      </div>
      <small className="max-w-screen-sm m-auto block mt-5 text-black/50">
        로그인 후 서비스 이용 가능합니다. 이미 회원가입을 하셨나요?
        <Link href={"/log-in"} className="underline ml-2 text-black">
          로그인하러 가기
        </Link>
      </small>
    </>
  );
}

export default SignUpPage;
