import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

import { useEffect, useState, createContext, useContext } from "react";

import {
  WagmiConfig,
  createConfig,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { mainnet, goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Web3AuthConnectorInstance from "../utils/web3AuthConnector";

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet, polygonMumbai],
  [publicProvider()]
);

// Set up client
const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "8a17560526d61e572fd31b3a86f4bed4",
        showQrModal: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const UserContext = createContext<{
  user: string;
  setUser: (user: string) => void;
}>({
  user: "",
  setUser: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      {/* <UserContext.Provider value={{ user, setUser: (value) => setUser(value) }}> */}
      <Head>
        <title>Fruity Friends</title>
      </Head>
      <Component {...pageProps} />
      {/* </UserContext.Provider> */}
    </WagmiConfig>
  );
}
