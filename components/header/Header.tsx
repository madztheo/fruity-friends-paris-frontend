import styles from "./Header.module.scss";
import cn from "classnames";
import { initXMTPClient } from "@/utils/xmtp";
import { useContext } from "react";
import { useConnect } from "wagmi";

export function Header({
  className,
  title,
}: //walletAddress,
//setWalletAddres
{
  className?: string;
  title: string;
  //walletAddress: string;
  //setWalletAddres: (address: string) => void;
}) {
  // const { user, setUser } = useContext(UserContext);
  // const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  // const router = useRouter();

  return (
    <header className={cn(className, styles.container)}>
      <p className={styles.title}>{title}</p>
    </header>
  );
}
