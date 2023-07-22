import { message } from "@xmtp/proto";
import styles from "./Message.module.scss";
import cn from "classnames";
import { format } from "date-fns";

export function Message({
  className = "",
  content,
  date,
  isCurrentUser = false,
}: {
  className?: string;
  content: string;
  date: Date;
  isCurrentUser: boolean;
}) {
  return (
    <div
      className={cn(styles.container, {
        [styles.focused]: isCurrentUser,
      })}
    >
      <div className={styles.content}>
        <div className={styles.picture}></div>
        <div className={styles.message}>
          <p className={styles.message__value}>{content}</p>
          <p className={styles.time}>{format(date, "HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}
