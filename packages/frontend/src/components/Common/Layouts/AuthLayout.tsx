import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import userAPI from "@/lib/api/user";
import { Me } from "@/lib/type/userType";
import { GUEST_REDIRECT_URL } from "@/lib/utils/constant";

interface Props {
  children?: React.ReactNode;
  setUser?: React.Dispatch<React.SetStateAction<Me | undefined>>;
  title: string;
}

// 認証済みの画面
const AuthLayout: React.VFC<Props> = (props) => {
  const router = useRouter();

  // TODO: accessTokenの有効期限が切れているなら更新する
  useEffect(() => {
    void (async () => {
      if (window.localStorage.getItem("accessToken") !== null) {
        // get user data
        const { data, status } = await userAPI.me(
          window.localStorage.getItem("accessToken")!
        );

        if (status === 200) {
          if (props.setUser !== undefined) {
            props.setUser(data.user);
          }
          return;
        } else if (
          status === 401 &&
          window.localStorage.getItem("refreshToken") !== null
        ) {
          // TODO: refresh tokens
          // const { data, status } = await userAPI.refresh(
          //   window.localStorage.getItem("refreshToken")!
          // );
          // if (status === 200) {
          //   setUser(data.user);
          //   window.localStorage.setItem("accessToken", data.accessToken);
          //   window.localStorage.setItem("refreshToken", data.refreshToken);
          //   return;
          // }
        }
      }
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");
      await router.push(GUEST_REDIRECT_URL);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>{props.title}</title>
      </Head>
      <main>{props.children}</main>
    </>
  );
};

export default AuthLayout;
