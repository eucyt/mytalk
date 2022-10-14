import Head from "next/head";
import React from "react";

import ApplicationLogo from "@/components/Common/ApplicationLogo";
import GuestLayout from "@/components/Common/Layouts/GuestLayout";

const Index = () => {
  return (
    <GuestLayout>
      <Head>
        <title>MyTalk - Home</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center">
        <div>
          <ApplicationLogo className="mx-auto" />
          <h1 className="font-serif text-7xl">MyTalk</h1>
          <div className="flex justify-center">
            <a href="/register">
              <button className="mx-auto mt-10 border border-gray-900 bg-white px-8 py-4 text-xl transition ease-in-out hover:bg-gray-900 hover:text-gray-100">
                Get Started!
              </button>
            </a>
          </div>
          <div className="flex justify-center">
            <a
              className="mx-auto mt-6 text-gray-400 underline transition ease-in-out hover:text-gray-300"
              href="https://euchi.jp/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Creator&apos;s Portfolio Site
            </a>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Index;
