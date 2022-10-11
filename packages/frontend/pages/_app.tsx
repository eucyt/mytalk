import "../styles/globals.css";
import React from "react";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return <Component {...pageProps} />;
}

export default MyApp;
