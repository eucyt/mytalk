import React from "react";

import Loading from "@/components/Common/Loading";

const FullSizeLoading: React.VFC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
    <Loading />
  </div>
);

export default FullSizeLoading;
