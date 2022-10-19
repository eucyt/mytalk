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
}

// 認証済みの画面
const AuthLayoutWithHeaderFooter: React.VFC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <title>MyTalk</title>
        </Head>
        <FullSizeLoading />
      </>
    );
  } else {
    return (
      <AuthLayout setUser={props.setUser}>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <title>MyTalk</title>
        </Head>

        <div className="min-h-screen bg-gray-100">
          <Navigation user={props.user} setLoading={setLoading} />
          <main>{props.children}</main>
        </div>
      </AuthLayout>
    );
  }
};

export default AuthLayoutWithHeaderFooter;
