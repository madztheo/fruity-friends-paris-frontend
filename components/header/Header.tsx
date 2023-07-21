import styles from "./Header.module.scss";
import cn from "classnames";

export function Header({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <header className={cn(className, styles.container)}>
      <p className={styles.title}>{title}</p>
    </header>
  );
}
