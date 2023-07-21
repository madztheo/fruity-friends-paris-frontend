import { Header } from "@/components/header/Header";
import styles from "./MainLayout.module.scss";
import { BottomNavbar } from "@/components/bottom-navbar/BottomNavbar";
import cn from "classnames";

export function MainLayout({
  children,
  className,
  title = "Fruity Friends",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.content}>
        <Header title={title} className={styles.header} />
        <div className={styles.children}>{children}</div>
        <BottomNavbar className={styles.bottom__navbar} />
      </div>
    </div>
  );
}
