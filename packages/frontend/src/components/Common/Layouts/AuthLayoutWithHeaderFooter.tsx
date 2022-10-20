import Head from "next/head";
import React, { useState } from "react";

import FullSizeLoading from "@/components/Common/FullSizeLoading";
import Navigation from "@/components/Common/Header/Auth/Navigation";
import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import { User } from "@/lib/type/userType";

interface Props {
  children?: React.ReactNode;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  title: string;
}

// 認証済みの画面
const AuthLayoutWithHeaderFooter: React.VFC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <title>{props.title}</title>
        </Head>
        <FullSizeLoading />
      </>
    );
  } else {
    return (
      <AuthLayout setUser={props.setUser} title={props.title}>
        <div className="min-h-screen bg-gray-100">
          <Navigation user={props.user} setLoading={setLoading} />
          <main className="flex h-[calc(100vh-64px)] flex-col items-center bg-gray-100 p-2 sm:p-12">
            {props.children}
          </main>
        </div>
      </AuthLayout>
    );
  }
};

export default AuthLayoutWithHeaderFooter;
