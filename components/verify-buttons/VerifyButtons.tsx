import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import styles from "./VerifyButtons.module.scss";
import cn from "classnames";
import { clientSideRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { PolygonIdPopup } from "../popup/polygon-id-popup/PolygonIdPopup";
import { useRouter } from "next/router";
import { useUser } from "@/utils/hook";
import { User } from "@/types";

export function VerifyButtons({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [polygonIdPopupVisible, setPolygonIdPopupVisible] = useState(false);
  const [request, setRequest] = useState<any>();
  const router = useRouter();
  const user = useUser();
  const [checkingPolygonID, setCheckingPolygonID] = useState(false);

  const onVerifyWithPolygonID = async () => {
    setLoading(true);
    const result = await clientSideRequest("/api/polygon-id/request", {
      user_id: user?._id,
    });
    setRequest(result);
    setPolygonIdPopupVisible(true);
    setLoading(false);
    setCheckingPolygonID(true);
  };

  useEffect(() => {
    if (checkingPolygonID) {
      const interval = setInterval(() => {
        clientSideRequest(`/api/user/get-by-address`, {
          address: user?.address,
        }).then(({ user: usr }) => {
          if ((usr as User).isPolygonIdVerified) {
            clearInterval(interval);
            setCheckingPolygonID(false);
            router.reload();
          }
        });
      }, 5000);
      return clearInterval(interval);
    }
  }, [checkingPolygonID]);

  return (
    <div className={cn(className, styles.container)}>
      <PolygonIdPopup
        visible={polygonIdPopupVisible}
        onClose={() => {
          setPolygonIdPopupVisible(false);
        }}
        request={request}
      />
      {user && !user.isWorldcoinVerified && (
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID!} // obtained from the Developer Portal
          action="humancheck" // this is your action name from the Developer Portal
          onSuccess={async (res: ISuccessResult) => {
            await clientSideRequest("/api/worldcoin/verify", {
              ...res,
              user_id: user._id,
            });
            router.reload();
            setLoading(false);
          }}
          handleVerify={() => {
            setLoading(false);
          }}
          credential_types={[CredentialType.Orb] as CredentialType[]}
          enableTelemetry
        >
          {({ open }) => (
            <Button
              className={styles.button}
              onClick={() => {
                setLoading(true);
                open();
              }}
              text="Verify with Worldcoin"
              loading={loading}
              loadingText="Verifying..."
            />
          )}
        </IDKitWidget>
      )}
      {user && !user.isPolygonIdVerified && (
        <Button
          className={styles.button}
          text="Verify with Polygon ID"
          loadingText="Verifying..."
          loading={loading}
          onClick={onVerifyWithPolygonID}
        />
      )}
    </div>
  );
}
