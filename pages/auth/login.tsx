import { Button } from "@/components/button/Button";
import styles from "../../styles/auth/Login.module.scss";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [isClientConnected, setIsClientConnected] = useState(false);
  const {
    address,
    connector,
    isConnected: isConnectedFromWagmi,
  } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const router = useRouter();

  useEffect(() => {
    setIsClientConnected(isConnectedFromWagmi);
  }, [isConnectedFromWagmi]);

  useEffect(() => {
    if (isClientConnected) {
      setTimeout(() => router.push("/messages"), 2000);
    }
  }, [isClientConnected]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Fruity Friends</p>
        <div className="main">
          {isClientConnected ? (
            <div className="main">
              <div className="title">Connected to {connector?.name}</div>
              <div>{address}</div>
              <Button text="Disconnect" onClick={disconnect as any}></Button>
              Redirecting...
            </div>
          ) : (
            <div>
              {connectors.map((connector) => {
                return (
                  <Button
                    text="Connect"
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                  </Button>
                );
              })}
            </div>
          )}
          {error && <div>{error.message}</div>}
        </div>
      </div>
    </div>
  );
}
