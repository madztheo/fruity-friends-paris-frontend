import Link from "next/link";
import styles from "./BottomNavbar.module.scss";
import cn from "classnames";
import {
  MessagesIcon,
  PeopleIcon,
  ProfileIcon,
  StackIcon,
} from "../icons/Icons";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function BottomNavbar({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <nav className={cn(className, styles.container)}>
      <Link
        href="/profile"
        className={cn(styles.button, {
          [styles.active]: router.asPath.startsWith("/profile"),
        })}
      >
        <ProfileIcon className={styles.button__icon} />
      </Link>
      <Link
        href="/"
        className={cn(styles.button, {
          [styles.active]: router.asPath === "/",
        })}
      >
        <StackIcon className={styles.button__icon} />
      </Link>
      <Link
        href="/messages"
        className={cn(styles.button, {
          [styles.active]: router.asPath === "/messages",
        })}
      >
        <MessagesIcon className={styles.button__icon} />
      </Link>
    </nav>
  );
}
