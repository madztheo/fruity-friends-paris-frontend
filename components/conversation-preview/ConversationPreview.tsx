import { Conversation } from "@xmtp/xmtp-js";
import styles from "./ConversationPreview.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { formatAddress } from "@/utils";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import strawberry from "@/public/img/strawberries_9f3faa73-9cf4-4962-ab94-9b9935d82006.jpg";
import { useUser } from "@/utils/hook";
import { User } from "@/types";
import { clientSideRequest } from "@/utils/api";

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
  const connectedUser = useUser();
  const [receiver, setReceiver] = useState<User>();

  useEffect(() => {
    if (conversation) {
      (async () => {
        try {
          const { user: usr } = await clientSideRequest(
            "/api/user/get-by-address",
            {
              address: conversation.peerAddress,
            }
          );
          setReceiver(usr);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [conversation]);

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
        {receiver && receiver.picture && (
          <Image
            src={receiver?.picture}
            fill
            alt=""
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{receiver?.name}</p>
        <p className={styles.message}>{lastMessage}</p>
      </div>
    </Link>
  );
}
