import { message } from "@xmtp/proto";
import styles from "./Message.module.scss";
import cn from "classnames";
import { format } from "date-fns";
import Image, { StaticImageData } from "next/image";
import { getImageByIndex } from "@/utils";

export function Message({
  className = "",
  content,
  date,
  isCurrentUser = false,
  image = getImageByIndex(Math.floor(Math.random() * 7)),
}: {
  className?: string;
  content: string;
  date: Date;
  isCurrentUser: boolean;
  image?: StaticImageData | string;
}) {
  return (
    <div
      className={cn(styles.container, {
        [styles.focused]: isCurrentUser,
      })}
    >
      <div className={styles.content}>
        <div className={styles.picture}>
          <Image
            src={image}
            alt=""
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className={styles.message}>
          <p className={styles.message__value}>{content}</p>
          <p className={styles.time}>{format(date, "HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}
