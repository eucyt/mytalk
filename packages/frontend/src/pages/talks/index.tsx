import Head from "next/head";
import React from "react";

import AuthLayout from "@/components/Common/Layouts/AuthLayout";

const Index = () => {
  return (
    <AuthLayout>
      <Head>
        <title>MyTalk - Talk</title>
      </Head>
    </AuthLayout>
  );
};

export default Index;
