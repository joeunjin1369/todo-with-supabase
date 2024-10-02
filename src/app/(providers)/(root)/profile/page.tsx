"use client";

import supabase from "@/supabase/client";
import React, { ComponentProps, useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";

function ProfilePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [myProfile, setMyProfile] = useState<Tables<"profiles"> | null>(null);

  const handleChangeInput: ComponentProps<"input">["onChange"] = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length === 0) return setImageFile(null);

    const file = files[0];
    setImageFile(file);
  };

  const handleClickUpdateProfile = async () => {
    console.log(imageFile);

    if (!imageFile) return;

    const response = await supabase.auth.getUser();
    const user = response.data.user!;

    const extension = imageFile.name.split(".").slice(-1)[0];

    const { data } = await supabase.storage
      .from("profile")
      .upload(`${user.id}.${extension}`, imageFile, { upsert: true });

    if (!data) return alert("이미지 저장 실패");

    const baseUrl =
      "https://lpzbllfgkwbpsxfsxait.supabase.co/storage/v1/object/public/";

    await supabase
      .from("profiles")
      .update({ imageUrl: baseUrl + data.fullPath })
      .eq("userId", user.id);

    console.log(baseUrl + data.fullPath);
    alert("수정되었습니다");
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user!;

      if (!user) return;

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("userId", user.id);

      if (!profiles) return;

      const myProfile = profiles[0];
      setMyProfile(myProfile);
    })();
  }, []);

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="profile-image-input">프로필 사진 수정</label>
      <input
        onChange={handleChangeInput}
        id="profile-image-input"
        type="file"
      />
      <button
        onClick={handleClickUpdateProfile}
        className="bg-black text-white px-3 py-2"
      >
        수정하기
      </button>

      <section className="mt-20">
        {myProfile ? (
          <img src={myProfile.imageUrl!} />
        ) : (
          <p>현재 프로필 사진이 없어요</p>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
