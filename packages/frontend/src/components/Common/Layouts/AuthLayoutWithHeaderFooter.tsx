import Head from "next/head";
import React, { useState } from "react";

import FullSizeLoading from "@/components/Common/FullSizeLoading";
import Navigation from "@/components/Common/Header/Auth/Navigation";
import AuthLayout from "@/components/Common/Layouts/AuthLayout";
import { User } from "@/lib/type/userType";

interface Props {
  children?: React.ReactNode;
}

// 認証済みの画面
const AuthLayoutWithHeaderFooter: React.VFC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

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
      <AuthLayout setUser={setUser}>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <title>MyTalk</title>
        </Head>

        <div className="min-h-screen bg-gray-100">
          <Navigation user={user} setLoading={setLoading} />
          <main className="">{props.children}</main>
        </div>
      </AuthLayout>
    );
  }
};

export default AuthLayoutWithHeaderFooter;
