import { Conversation } from "@xmtp/xmtp-js";
import styles from "./ConversationPreview.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { formatAddress } from "@/utils";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import strawberry from "@/public/img/strawberries_9f3faa73-9cf4-4962-ab94-9b9935d82006.jpg";

export function ConversationPreview({
  className,
  conversation,
  image = strawberry,
}: {
  className?: string;
  conversation: Conversation;
  image?: StaticImageData | string;
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
      <div className={styles.profile__pic}>
        <Image
          src={strawberry}
          fill
          alt=""
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{formatAddress(conversation.peerAddress)}</p>
        <p className={styles.message}>{lastMessage}</p>
      </div>
    </Link>
  );
}
