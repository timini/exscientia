import type { AppProps } from "next/app";
import type { FC } from "react";
import "../styles/globals.css";

const Layout: FC = ({ children }) => (
  <div className="flex w-full min-h-screen items-center justify-center">
    {children}
  </div>
);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
