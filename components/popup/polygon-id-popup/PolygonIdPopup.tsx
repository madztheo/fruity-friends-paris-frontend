import Link from "next/link";
import { Popup } from "../Popup";
import styles from "./PolygonIdPopup.module.scss";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/button/Button";

export function PolygonIdPopup({
  visible,
  onClose,
  request,
}: {
  visible: boolean;
  onClose: () => void;
  request: any;
}) {
  const convertToBase64 = (obj: any) => {
    return obj ? Buffer.from(JSON.stringify(obj)).toString("base64") : "";
  };

  return (
    <Popup
      className={styles.container}
      visible={visible}
      onClose={onClose}
      title="Scan the QR Code with Polygon ID app"
    >
      <div className={styles.content}>
        <QRCodeSVG
          className={styles.qr__code}
          level="M"
          value={request ? JSON.stringify(request) : ""}
        />
        <Button
          className={styles.link}
          href={`iden3comm://?i_m=${convertToBase64(request)}`}
          text="Open directly in the app"
          theme="transparent"
        />
      </div>
    </Popup>
  );
}
