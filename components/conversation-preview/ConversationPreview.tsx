import { Conversation } from "@xmtp/xmtp-js";
import styles from "./ConversationPreview.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { formatAddress } from "@/utils";
import Link from "next/link";

export function ConversationPreview({
  className,
  conversation,
}: {
  className?: string;
  conversation: Conversation;
}) {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (conversation) {
        const messages = await conversation.messages();
        if (messages.length > 0) {
          setLastMessage(messages[messages.length - 1].content);
        }
      }
    })();
  }, [conversation]);

  return (
    <Link
      href={`/messages/${conversation.peerAddress}`}
      className={cn(className, styles.container)}
    >
      <div className={styles.profile__pic}></div>
      <div className={styles.content}>
        <p className={styles.name}>{formatAddress(conversation.peerAddress)}</p>
        <p className={styles.message}>{lastMessage}</p>
      </div>
    </Link>
  );
}
