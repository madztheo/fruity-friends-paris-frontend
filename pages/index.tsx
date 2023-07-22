import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { ProfileCard } from "@/components/profile-card/ProfileCard";
import { MainLayout } from "@/layouts/main-layout/MainLayout";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/hook";
import { User } from "@/types";
import { clientSideRequest } from "@/utils/api";
import { useRouter } from "next/router";

export default function Home() {
  const user = useUser();
  const [currentProfile, setCurrentProfile] = useState<User>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) {
        const { user: profile } = await clientSideRequest("/api/user/random", {
          id: user._id,
        });
        console.log(profile);
        setCurrentProfile(profile);
        setLoading(false);
      }
    })();
  }, [user]);

  const onNext = async () => {
    if (user) {
      setCurrentProfile(undefined);
      setLoading(true);
      const { user: profile } = await clientSideRequest("/api/user/random", {
        id: user._id,
      });
      setCurrentProfile(profile);
      setLoading(false);
    }
  };

  const canShowDeck = () => {
    return user && user.description && user.picture && user.age && user.name;
  };

  return (
    <MainLayout title="Profiles">
      {!loading && currentProfile && canShowDeck() && (
        <ProfileCard
          className={styles.profile__card}
          user={currentProfile}
          onNext={onNext}
          onMatch={(matchedUser: User) => {
            router.push(`/messages/${matchedUser.address}`);
          }}
        />
      )}
      {!loading && !currentProfile && canShowDeck() && (
        <div className={styles.empty__deck}>
          <p>No more profile to show at the moment</p>
        </div>
      )}
      {!loading && currentProfile && !canShowDeck() && (
        <div className={styles.empty__deck}>
          <p>Complete your profile to begin matching</p>
        </div>
      )}
      {loading && (
        <div className={styles.empty__deck}>
          <p>Loading...</p>
        </div>
      )}
    </MainLayout>
  );
}
