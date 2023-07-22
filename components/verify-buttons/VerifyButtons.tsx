import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import styles from "./VerifyButtons.module.scss";
import cn from "classnames";
import { clientSideRequest } from "@/utils/api";
import { useState } from "react";
import { Button } from "../button/Button";
import { PolygonIdPopup } from "../popup/polygon-id-popup/PolygonIdPopup";

export function VerifyButtons({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [polygonIdPopupVisible, setPolygonIdPopupVisible] = useState(false);
  const [request, setRequest] = useState<any>();

  const onVerifyWithPolygonID = async () => {
    setLoading(true);
    const result = await clientSideRequest("/api/polygon-id/request", {});
    setRequest(result);
    setPolygonIdPopupVisible(true);
    setLoading(false);
  };

  return (
    <div className={cn(className, styles.container)}>
      <PolygonIdPopup
        visible={polygonIdPopupVisible}
        onClose={() => {
          setPolygonIdPopupVisible(false);
        }}
        request={request}
      />
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID!} // obtained from the Developer Portal
        action="humancheck" // this is your action name from the Developer Portal
        onSuccess={async (res: ISuccessResult) => {
          console.log(res);
          const result = await clientSideRequest("/api/worldcoin/verify", res);
          console.log(result);
          setLoading(false);
        }} // callback when the modal is closed
        handleVerify={() => {
          console.log("verify");
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
      <Button
        className={styles.button}
        text="Verify with Polygon ID"
        loadingText="Verifying..."
        loading={loading}
        onClick={onVerifyWithPolygonID}
      />
    </div>
  );
}
