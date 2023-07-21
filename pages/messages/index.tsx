import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { ProfileCard } from "@/components/profile-card/ProfileCard";
import { MainLayout } from "@/layouts/main-layout/MainLayout";
import { ConversationPreview } from "@/components/conversation-preview/ConversationPreview";
import { UserContext } from "../_app";
import { useContext, useEffect } from "react";

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
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <MainLayout title="My conversations">
      {user ? "hey" : "no user"}
      {/* <div className={styles.container}>
        {MESSAGES.map((message, index) => (
          <ConversationPreview
            key={index}
            name={message.name}
            address={message.address}
            lastMessage={message.lastMessage}
          />
        ))}
      </div> */}
    </MainLayout>
  );
}
