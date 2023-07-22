import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { ProfileCard } from "@/components/profile-card/ProfileCard";
import { MainLayout } from "@/layouts/main-layout/MainLayout";
import { ConversationPreview } from "@/components/conversation-preview/ConversationPreview";
import { useContext, useEffect, useState } from "react";
import { useEthersSigner } from "@/utils/wagmi-to-ethers";
import {
  getAllConversations,
  initConversation,
  initXMTPClient,
} from "@/utils/xmtp";
import { Conversation } from "@xmtp/xmtp-js";

const MESSAGES = [
  {
    name: "Jane Doe",
    address: "0x1234567890123456789012345678901234567890",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae er",
  },
  {
    name: "Patricia Doe",
    address: "0x1234567890123456789012345678901234567890",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae er",
  },
  {
    name: "Jane Smith",
    address: "0x1234567890123456789012345678901234567890",
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae er",
  },
];

export default function Home() {
  //const { user, setUser } = useContext(UserContext);
  const signer = useEthersSigner();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    (async () => {
      console.log(signer);
      try {
        if (signer) {
          const xmtpClient = await initXMTPClient(signer);
          const conversations = await getAllConversations(xmtpClient);
          if (conversations && conversations.length > 0) {
            setConversations(conversations);
          } else {
            const conversation = await initConversation(
              xmtpClient,
              "0x14bD21Bd869beb87A5910421D5ce29c972905a37"
            );
            setConversations([conversation]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [signer]);

  return (
    <MainLayout title="My conversations" className={styles.container}>
      {conversations.map((conversation, index) => (
        <ConversationPreview key={index} conversation={conversation} />
      ))}
    </MainLayout>
  );
}
