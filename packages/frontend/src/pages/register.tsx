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

const Register: React.VFC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = async (event: { preventDefault: () => void }) => {
    setLoading(true);
    event.preventDefault();

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password !== passwordConfirmation) {
      setErrors(["Passwords do not match."]);
    }
    try {
      const { data, status } = await userAPI.register(name, email, password);
      switch (status) {
        case 201:
          if (data.accessToken && data.refreshToken) {
            window.localStorage.setItem("accessToken", data.accessToken);
            window.localStorage.setItem("refreshToken", data.refreshToken);
            await router.push(AUTHED_REDIRECT_URL);
          }
          break;
        case 400:
          setErrors(data.message);
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
      <GuestLayout title={"MyTalk - Register"}>
        <AuthCard logo={<ApplicationLogo />}>
          <AuthValidationErrors className="mb-4" errors={errors} />

          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={submitForm}>
            <div>
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                type="text"
                value={name}
                className="mt-1 block w-full"
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={email}
                className="mt-1 block w-full"
                onChange={(event) => setEmail(event.target.value)}
                required
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
                autoComplete="new-password"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>

              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                className="mt-1 block w-full"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                required
              />
            </div>

            <div className="mt-4 flex items-center justify-end">
              <Link href="/login">
                <a className="text-sm text-gray-600 underline hover:text-gray-900">
                  Already registered?
                </a>
              </Link>

              <Button className="ml-4">Register</Button>
            </div>
          </form>
        </AuthCard>
      </GuestLayout>
    );
  }
};

export default Register;
