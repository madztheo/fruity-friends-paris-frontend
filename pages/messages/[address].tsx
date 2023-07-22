import { Input } from "@/components/input/Input";
import styles from "../../styles/messages/Conversation.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { BackIcon, SendIcon } from "@/components/icons/Icons";
import { formatAddress, wait } from "@/utils";
import { useRouter } from "next/router";
import { Message } from "@/components/message/Message";
import { getConversation, initXMTPClient } from "@/utils/xmtp";
import { useEthersSigner } from "@/utils/wagmi-to-ethers";

export default function Conversation() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { address } = router.query;
  const signer = useEthersSigner();
  const [messages, setMessages] = useState<
    {
      from: string;
      content: string;
      date: Date;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      if (!signer) {
        return;
      }
      const xmtpClient = await initXMTPClient(signer);
      const conversation = await getConversation(xmtpClient, address as string);
      if (conversation) {
        const messages = await conversation.messages();
        /*setMessages(messages.map((message) => ({
        })));*/
      }
    })();
  });

  const onSend = async () => {
    try {
      if (!signer) {
        return;
      }
      const xmtpClient = await initXMTPClient(signer);
      setSending(true);

      ///await wait(1000);
      setMessages((prev) => [
        ...prev,
        {
          from: "me",
          content: message,
          date: new Date(),
        },
      ]);
      setSending(false);
      await wait(2000);
      setMessages((prev) => [
        ...prev,
        {
          from: "Jane",
          content: "Not interested",
          date: new Date(),
        },
      ]);
    } catch (error) {}
    setSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            className={styles.back__button}
            onClick={() => {
              router.back();
            }}
          >
            <BackIcon className={styles.back__button__icon} />
          </button>
          <div className={styles.profile__pic}></div>
          <p className={styles.name}>{formatAddress(address as string)}</p>
        </div>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              date={message.date}
              isCurrentUser={message.from === "me"}
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
