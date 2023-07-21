import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { ProfileCard } from "@/components/profile-card/ProfileCard";
import { MainLayout } from "@/layouts/main-layout/MainLayout";

export default function Home() {
  return (
    <MainLayout title="Profiles">
      <ProfileCard className={styles.profile__card} />
    </MainLayout>
  );
}
