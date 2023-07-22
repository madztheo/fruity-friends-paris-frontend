import { Input } from "@/components/input/Input";
import styles from "../../styles/messages/Conversation.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { BackIcon, SendIcon } from "@/components/icons/Icons";
import { formatAddress, getImageByIndex, wait } from "@/utils";
import { useRouter } from "next/router";
import { Message } from "@/components/message/Message";
import { getConversation, initXMTPClient } from "@/utils/xmtp";
import { useEthersSigner } from "@/utils/wagmi-to-ethers";
import { useAccount } from "wagmi";
import { TopBar } from "@/components/top-bar/TopBar";

export default function Conversation() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { address } = router.query;
  const signer = useEthersSigner();
  const { address: connnectedUserAddr } = useAccount();
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
        if (messages) {
          setMessages(
            messages.map((message) => ({
              from: message.senderAddress,
              date: message.sent,
              content: message.content,
            }))
          );
          console.log(messages);
        }
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
      console.log(connnectedUserAddr);
      const conversation = await getConversation(xmtpClient, address as string);
      if (!conversation) {
        return;
      }
      await conversation.send(message);
      setMessages((prev) => [
        ...prev,
        {
          from: connnectedUserAddr as string,
          content: message,
          date: new Date(),
        },
      ]);
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
          image={getImageByIndex(5)}
          className={styles.top}
          title={formatAddress(address as string)}
        />
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              date={message.date}
              isCurrentUser={message.from === connnectedUserAddr}
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
