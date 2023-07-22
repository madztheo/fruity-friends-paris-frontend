import { Button } from "@/components/button/Button";
import styles from "../../styles/auth/Login.module.scss";
import { useState } from "react";
import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { clientSideRequest } from "@/utils/api";

export default function Worldcoin() {
  const [loading, setLoading] = useState(false);

  const onVerifyWithPolygonID = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/polygon-id/sign-in/deeplink`
    );
    if (response.ok) {
      const { url } = await response.json();
      window.open(url);
    } else {
      console.log(await response.text());
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Fruity Friends</p>
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID!} // obtained from the Developer Portal
          action="humancheck" // this is your action name from the Developer Portal
          onSuccess={async (res: ISuccessResult) => {
            console.log(res);
            const result = await clientSideRequest(
              "/api/worldcoin/verify",
              res
            );
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
    </div>
  );
}
