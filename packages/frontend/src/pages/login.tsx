import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import AuthCard from "@/components/Auth/AuthCard";
import AuthValidationErrors from "@/components/Auth/AuthValidationErrors";
import Input from "@/components/Auth/Input";
import Label from "@/components/Auth/Label";
import ApplicationLogo from "@/components/Common/ApplicationLogo";
import Button from "@/components/Common/Button";
import FullSizeLoading from "@/components/Common/FullSizeLoading";
import GuestLayout from "@/components/Common/Layouts/GuestLayout";
import userAPI from "@/lib/api/user";
import { AUTHED_REDIRECT_URL } from "@/lib/utils/constant";

const Login: React.VFC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitForm = async (event: { preventDefault: () => void }) => {
    setLoading(true);
    event.preventDefault();

    try {
      const { data, status } = await userAPI.login(email, password);
      switch (status) {
        case 200:
          if (data.accessToken && data.refreshToken) {
            window.localStorage.setItem("accessToken", data.accessToken);
            window.localStorage.setItem("refreshToken", data.refreshToken);
            await router.push(AUTHED_REDIRECT_URL);
          }
          break;
        case 401:
          setErrors(["Email or password is invalid."]);
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <FullSizeLoading />;
  } else {
    return (
      <GuestLayout>
        <AuthCard
          logo={
            <a>
              <ApplicationLogo />
            </a>
          }
        >
          <AuthValidationErrors className="mb-4" errors={errors} />

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={submitForm}>
            <div>
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={email}
                className="mt-1 block w-full"
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                value={password}
                className="mt-1 block w-full"
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="mt-4 flex items-center justify-end">
              <Link href="/register">
                <a className="mr-4 text-sm text-gray-600 underline hover:text-gray-900">
                  Sign up
                </a>
              </Link>

              <Button className="ml-3">Login</Button>
            </div>
          </form>
        </AuthCard>
      </GuestLayout>
    );
  }
};

export default Login;
