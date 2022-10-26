import Head from "next/head";
import React, { useEffect } from "react";

import Footer from "@/components/Common/Header/Guest/Footer";
import Header from "@/components/Common/Header/Guest/Header";

interface Props {
  children: React.ReactNode;
  title: string;
}

// ログイン画面などのヘッダーがない認証前の画面
const GuestLayout: React.VFC<Props> = (props) => {
  // 認証済みならリダイレクト
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (window.localStorage.getItem("accessToken") !== null) {
      window.location.href = "/talks";
    }
  }, []);

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="">{props.children}</main>
        <Footer />
      </div>
    </>
  );
};

export default GuestLayout;
