import React, { PropsWithChildren } from "react";
import Header from "./_components/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className=" min-h-screen">
      <Header />
      <main className="py-5 px-10 m-auto">{children}</main>
    </div>
  );
}

export default RootLayout;
