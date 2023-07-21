import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

import { useEffect, useState, createContext, useContext } from "react";
import { Web3AuthModalPack } from "@safe-global/auth-kit";

export const UserContext = createContext<{
  user: Web3AuthModalPack | null;
  setUser: (user: Web3AuthModalPack) => void;
}>({
  user: null,
  setUser: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<Web3AuthModalPack | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser: (value) => setUser(value) }}>
      <Head>
        <title>Fruity Friends</title>
      </Head>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
