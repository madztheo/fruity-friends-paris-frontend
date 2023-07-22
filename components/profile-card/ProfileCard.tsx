import styles from "./ProfileCard.module.scss";
import cn from "classnames";
import Image, { StaticImageData } from "next/image";
import { CheckmarkIcon, CloseIcon } from "../icons/Icons";
import axios from "axios";
import { UserContext } from "@/pages/_app";
import { useContext } from "react";
import pineapple from "@/public/img/pineapple_0ec73f1f-2dbb-48bb-89f8-dfe9df5b0c6b.jpg";
import { Like, User } from "@/types";
import { clientSideRequest } from "@/utils/api";
import { useUser } from "@/utils/hook";

export function ProfileCard({
  className,
  user,
  onNext,
  onMatch,
}: {
  className?: string;
  user: User;
  onNext: () => void;
  onMatch: (user: User) => void;
}) {
  const connectedUser = useUser();

  const onLike = async () => {
    try {
      const like: Like = await clientSideRequest("/api/like/send", {
        from: connectedUser?.address,
        to: user.address,
      });
      if (like.match) {
        onMatch(user);
      }
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.main__profile__pic}>
        {user && user.picture && (
          <Image
            src={user.picture}
            alt=""
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{user.name}</p>
        <p className={styles.description}>{user.description}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onNext}>
            <CloseIcon className={styles.button__icon} />
          </button>
          <button className={styles.button} onClick={onLike}>
            <CheckmarkIcon className={styles.button__icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
