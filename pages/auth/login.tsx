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
import axios from "axios";
import { clientSideRequest } from "@/utils/api";

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
    (async () => {
      if (isClientConnected) {
        const { user } = await clientSideRequest("/api/user/get-by-address", {
          address,
        });
        if (!user) {
          const createdUser = await clientSideRequest("/api/user/create", {
            address,
          });
          console.log(createdUser);
        }
        setTimeout(() => router.push("/profile"), 2000);
      }
    })();
  }, [isClientConnected]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Fruity Friends</p>
        {isClientConnected ? (
          <div className={styles.redirect__text}>Redirecting...</div>
        ) : (
          <div>
            {connectors.map((connector) => {
              return (
                <Button
                  text="Connect"
                  key={connector.id}
                  onClick={() => connect({ connector })}
                />
              );
            })}
          </div>
        )}
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}
