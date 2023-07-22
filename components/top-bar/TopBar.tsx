import { useRouter } from "next/router";
import { BackIcon } from "../icons/Icons";
import styles from "./TopBar.module.scss";
import cn from "classnames";
import Image, { StaticImageData } from "next/image";

export function TopBar({
  className = "",
  title,
  image,
}: {
  className?: string;
  title: string;
  image: StaticImageData | string | undefined;
}) {
  const router = useRouter();
  return (
    <div className={cn(styles.container, className)}>
      <button
        className={styles.back__button}
        onClick={() => {
          router.back();
        }}
      >
        <BackIcon className={styles.back__button__icon} />
      </button>
      <div className={styles.profile__pic}>
        {image && (
          <Image
            src={image}
            alt=""
            fill
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <p className={styles.name}>{title}</p>
    </div>
  );
}
