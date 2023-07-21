import styles from "./ProfileCard.module.scss";
import cn from "classnames";
import Image from "next/image";
import { CheckmarkIcon, CloseIcon } from "../icons/Icons";

export function ProfileCard({
  className,
  name = "Jane Doe",
  age = 25,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae er",
}: {
  className?: string;
  name?: string;
  age?: number;
  description?: string;
}) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.main__profile__pic}></div>
      <div className={styles.content}>
        <p className={styles.title}>
          {name}, {age}
        </p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <CloseIcon className={styles.button__icon} />
          </button>
          <button className={styles.button}>
            <CheckmarkIcon className={styles.button__icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
