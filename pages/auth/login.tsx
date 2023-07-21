import { Button } from "@/components/button/Button";
import styles from "../../styles/auth/Login.module.scss";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../_app";
import { initSafeAuthKit } from "../../utils/safe-auth-kit";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const init = async () => {
    const data = await initSafeAuthKit();
    setWeb3AuthModalPack(data);
  };

  useEffect(() => {
    init();
  }, []);

  const onSignIn = async () => {
    const data = await web3AuthModalPack.signIn();
    setUser(data);
  };

  const onSignOut = async () => {
    await web3AuthModalPack.signOut();
    setUser(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Fruity Friends</p>
        {user ? (
          <Button
            className={styles.button}
            theme="primary"
            text="Sign out"
            onClick={onSignOut}
            loading={loading}
            loadingText="Connecting..."
          />
        ) : (
          <Button
            className={styles.button}
            theme="primary"
            text="Sign in"
            onClick={onSignIn}
            loading={loading}
            loadingText="Connecting..."
          />
        )}
      </div>
    </div>
  );
}
