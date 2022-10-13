import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import FullSizeLoading from "@/components/Common/FullSizeLoading";
import Navigation from "@/components/Common/Header/Auth/Navigation";
import userAPI from "@/lib/api/user";
import { User } from "@/lib/type/userType";
import { GUEST_REDIRECT_URL } from "@/lib/utils/constant";

interface Props {
  children?: React.ReactNode;
}

// 認証済みの画面
const AuthenticatedLayout: React.VFC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  // TODO: accessTokenの有効期限が切れているなら更新する
  useEffect(() => {
    void (async () => {
      if (window.localStorage.getItem("accessToken") !== null) {
        const { data, status } = await userAPI.me(
          window.localStorage.getItem("accessToken")!
        );
        if (status === 200) {
          setUser(data.user);
        }
      } else {
        await router.push(GUEST_REDIRECT_URL);
      }
    })();
  }, [router]);

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
      <>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          <title>MyTalk</title>
        </Head>
        <div className="min-h-screen bg-gray-100">
          <Navigation user={user} setLoading={setLoading} />

          {/* Page Content */}
          <main className="">{props.children}</main>
        </div>
      </>
    );
  }
};

export default AuthenticatedLayout;
