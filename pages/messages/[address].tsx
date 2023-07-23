import { Input } from "@/components/input/Input";
import styles from "../../styles/messages/Conversation.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { BackIcon, SendIcon } from "@/components/icons/Icons";
import { formatAddress, getImageByIndex, wait } from "@/utils";
import { useRouter } from "next/router";
import { Message } from "@/components/message/Message";
import {
  getConversation,
  initConversation,
  initXMTPClient,
} from "@/utils/xmtp";
import { useEthersSigner } from "@/utils/wagmi-to-ethers";
import { useAccount } from "wagmi";
import { TopBar } from "@/components/top-bar/TopBar";
import { useUser } from "@/utils/hook";
import { clientSideRequest } from "@/utils/api";
import { User } from "@/types";
import { DecodedMessage } from "@xmtp/xmtp-js";

export default function Conversation() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { address } = router.query;
  const user = useUser();
  const signer = useEthersSigner();
  const connectedUser = useUser();
  const [receiver, setReceiver] = useState<User>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);

  useEffect(() => {
    if (address) {
      (async () => {
        try {
          const { user: usr } = await clientSideRequest(
            "/api/user/get-by-address",
            {
              address,
            }
          );
          setReceiver(usr);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [address]);

  useEffect(() => {
    (async () => {
      if (!signer) {
        return;
      }
      const xmtpClient = await initXMTPClient(signer);
      let conversation = await getConversation(xmtpClient, address as string);
      if (conversation) {
        const messages = await conversation.messages();
        if (messages) {
          setMessages(messages);
        }
      } else {
        conversation = await initConversation(xmtpClient, address as string);
      }
      for await (const message of await conversation.streamMessages()) {
        if (message.senderAddress === connectedUser?.address) {
          continue;
        }
        setMessages((prev) =>
          prev.some((x) => x.id === message.id) ? prev : [...prev, message]
        );
      }
    })();
  }, [signer]);

  const onSend = async () => {
    try {
      if (!signer) {
        return;
      }
      setMessage("");
      const xmtpClient = await initXMTPClient(signer);
      setSending(true);
      const conversation = await getConversation(xmtpClient, address as string);
      if (!conversation) {
        return;
      }
      const decodedMessage = await conversation.send(message);
      setMessages((prev) => [...prev, decodedMessage]);
      setSending(false);
    } catch (error) {
      console.log(error);
    }
    setSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TopBar
          image={receiver?.picture}
          className={styles.top}
          title={receiver?.name || ""}
        />
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              date={message.sent}
              isCurrentUser={message.senderAddress === connectedUser?.address}
              image={
                message.senderAddress === connectedUser?.address
                  ? user?.picture
                  : receiver?.picture
              }
            />
          ))}
        </div>
        <div className={styles.bottom}>
          <Input
            containerClassName={styles.input__container}
            value={message}
            placeholder="Type a message..."
            onEnter={() => {
              onSend();
            }}
            onChange={(val: string) => {
              setMessage(val);
            }}
          />
          <button className={styles.send__button} onClick={onSend}>
            <SendIcon className={styles.send__button__icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
