import styles from "./ConversationPreview.module.scss";
import cn from "classnames";

export function ConversationPreview({
  className,
  name,
  address,
  lastMessage,
}: {
  className?: string;
  name: string;
  address: string;
  lastMessage: string;
}) {
  return (
    <div className={cn(className, styles.container)}>
      <div className={styles.profile__pic}></div>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.message}>{lastMessage}</p>
      </div>
    </div>
  );
}
