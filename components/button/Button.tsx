import styles from "./Button.module.scss";
import cn from "classnames";
import Link from "next/link";

export function Button({
  text = "",
  className = "",
  onClick = (e) => {},
  disabled = false,
  type = "button",
  loading = false,
  loadingText = "",
  theme = "primary",
  icon = undefined,
  squareCorner = false,
  border = false,
  uppercase = false,
  href = "",
  openLinkInNewTab = false,
  svgIcon = undefined,
}: {
  text?: string | null;
  className?: string;
  onClick?: (e: any) => any;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  loadingText?: string | null;
  theme?: "primary" | "secondary" | "white" | "transparent" | "green" | "red";
  icon?: string;
  svgIcon?: any;
  squareCorner?: boolean;
  border?: boolean;
  uppercase?: boolean;
  href?: string;
  openLinkInNewTab?: boolean;
  interactiveHover?: boolean;
}) {
  return (
    <>
      {href && (
        <Link
          className={cn({
            [styles.button]: true,
            [styles[`button__${theme}`]]: true,
            [className]: !!className,
            [styles.square__corner]: squareCorner,
            [styles.with__border]: border,
            [styles.uppercase]: uppercase,
            [styles.disabled]: disabled,
          })}
          target={openLinkInNewTab ? "_blank" : "_self"}
          href={disabled ? "#" : href}
        >
          <>
            {icon && <img src={icon} className={styles.button__icon} />}
            {svgIcon && <div className={styles.button__icon}>{svgIcon}</div>}
            <p className={styles.button__text}>
              {loading ? loadingText : text}
            </p>
          </>
        </Link>
      )}
      {!href && (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled || loading}
          className={cn({
            [styles.button]: true,
            [styles[`button__${theme}`]]: true,
            [className]: !!className,
            [styles.square__corner]: squareCorner,
            [styles.with__border]: border,
            [styles.uppercase]: uppercase,
          })}
        >
          {icon && <img src={icon} className={styles.button__icon} />}
          {svgIcon && <div className={styles.button__icon}>{svgIcon}</div>}
          <p className={styles.button__text}>{loading ? loadingText : text}</p>
        </button>
      )}
    </>
  );
}
