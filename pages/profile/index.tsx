import { MainLayout } from "@/layouts/main-layout/MainLayout";
import styles from "../../styles/profile/Profile.module.scss";
import { VerifyButtons } from "@/components/verify-buttons/VerifyButtons";
import { Button } from "@/components/button/Button";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { resetXMTPClient } from "@/utils/xmtp";
import { PolygonIdPopup } from "@/components/popup/polygon-id-popup/PolygonIdPopup";
import { useState } from "react";

export default function Profile() {
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();

  return (
    <MainLayout className={styles.container} title="My profile">
      <div className={styles.content}>
        <div className={styles.picture__container}>
          <div className={styles.picture}></div>
          <p className={styles.name}>John</p>
          <div className={styles.verified__icons}></div>
        </div>
        <VerifyButtons className={styles.verify__buttons} />
        <Button
          text="Log out"
          onClick={async () => {
            await disconnectAsync();
            resetXMTPClient();
            router.replace("/auth/login");
          }}
        />
      </div>
    </MainLayout>
  );
}
