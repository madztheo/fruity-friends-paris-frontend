import styles from "./Popup.module.scss";
import Image from "next/image";
import cn from "classnames";
import { useOnOutsideClick } from "@/utils/hook";
import { useEffect, useRef, useState } from "react";

export function Popup({
  title = "",
  subtitle = "",
  children,
  visible = false,
  onClose,
  className = "",
  blurBackground = false,
}: {
  title?: string;
  subtitle?: string;
  children?: any;
  visible?: boolean;
  onClose: () => void;
  className?: string;
  blurBackground?: boolean;
}) {
  const ref = useRef<HTMLDivElement>();
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setCanClose(true);
      }, 500);
    } else {
      setCanClose(false);
    }
  }, [visible]);

  useOnOutsideClick(ref, () => {
    if (canClose) {
      onClose();
    }
  });

  return (
    <>
      {visible && (
        <div
          className={cn({
            [styles.container]: true,
            [styles.blur]: blurBackground,
          })}
        >
          <div
            ref={ref as any}
            className={cn({ [styles.popup]: true, [className]: !!className })}
          >
            {title && <p className={styles.title}>{title}</p>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
