import { MainLayout } from "@/layouts/main-layout/MainLayout";
import styles from "../../styles/profile/Profile.module.scss";
import { VerifyButtons } from "@/components/verify-buttons/VerifyButtons";
import { Button } from "@/components/button/Button";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { resetXMTPClient } from "@/utils/xmtp";
import { EditIcon } from "@/components/icons/Icons";
import { formatAddress } from "@/utils";
import lemon from "@/public/img/lemon_33bcd234-d7a7-4947-82dd-44ccf6017a6a.jpg";
import Image from "next/image";
import { useUser } from "@/utils/hook";
import polygonIdIcon from "@/public/img/logo/polygon_id_logo.svg";
import worldcoinLogoIcon from "@/public/img/logo/worldcoin-logo.svg";

export default function Profile() {
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();
  const { address } = useAccount();
  const user = useUser();

  return (
    <MainLayout className={styles.container} title="My profile">
      <div className={styles.content}>
        <div className={styles.picture__container}>
          <div className={styles.picture}>
            {user && user.picture && (
              <Image
                src={user?.picture}
                alt=""
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.address}>{formatAddress(address as string)}</p>
          {user && (user.isPolygonIdVerified || user.isWorldcoinVerified) && (
            <div className={styles.verified__icons}>
              {user && user.isPolygonIdVerified && (
                <div className={styles.verified__icon}>
                  <Image
                    src={polygonIdIcon}
                    alt=""
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              {user && user.isWorldcoinVerified && (
                <div className={styles.verified__icon}>
                  <Image
                    src={worldcoinLogoIcon}
                    alt=""
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.action__buttons}>
          <Button
            className={styles.edit__button}
            text="Edit"
            svgIcon={<EditIcon className={styles.edit__button__icon} />}
            href="/profile/edit"
            theme="transparent"
          />
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
