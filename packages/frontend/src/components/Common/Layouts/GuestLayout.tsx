import React from "react";

import Footer from "@/components/Common/Header/Guest/Footer";
import Header from "@/components/Common/Header/Guest/Header";

interface Props {
  children: React.ReactNode;
}

// ログイン画面などのヘッダーがない認証前の画面
const GuestLayout: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default GuestLayout;
