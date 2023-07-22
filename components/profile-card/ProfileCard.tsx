import styles from "./ProfileCard.module.scss";
import cn from "classnames";
import Image, { StaticImageData } from "next/image";
import { CheckmarkIcon, CloseIcon } from "../icons/Icons";
import axios from "axios";
import { UserContext } from "@/pages/_app";
import { useContext } from "react";
import pineapple from "@/img/pineapple_0ec73f1f-2dbb-48bb-89f8-dfe9df5b0c6b.jpg";

export function ProfileCard({
  className,
  name = "Jane Doe",
  age = 25,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae er",
  image = pineapple,
}: {
  className?: string;
  name?: string;
  age?: number;
  description?: string;
  image?: StaticImageData | string;
}) {
  const { user, setUser } = useContext(UserContext);

  const like = () => {
    /*let data = new FormData();
    data.append('from', user);
    data.append('to', to);

    axios.post('/api/like', {
      data
    })*/
  };

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.main__profile__pic}>
        <Image
          src={image}
          alt=""
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <CloseIcon className={styles.button__icon} />
          </button>
          <button className={styles.button} onClick={like}>
            <CheckmarkIcon className={styles.button__icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
