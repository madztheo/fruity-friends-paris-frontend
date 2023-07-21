import styles from "./Input.module.scss";
import cn from "classnames";
import { useState } from "react";

export function Input({
  id = "",
  value,
  onChange,
  placeholder = "",
  containerClassName = "",
  className = "",
  regex = /.*/gi,
  disabled = false,
  customValidator = (value): boolean => true,
  onEnter = (): any => {},
  onDelete = (): any => {},
  forceError = false,
  type = "text",
  maxLength = undefined,
  textarea = false,
  onPaste = (e: ClipboardEvent) => {},
  errorMessage = "",
  onValueCheck = (valid: boolean) => {},
  onClick = () => {},
}: {
  id?: string;
  value: string;
  onChange: Function;
  placeholder?: string;
  containerClassName?: string;
  className?: string;
  regex?: RegExp;
  disabled?: boolean;
  customValidator?: (value: any) => boolean;
  onEnter?: Function;
  onDelete?: Function;
  forceError?: boolean;
  type?: "text" | "password" | "email" | "number";
  maxLength?: number;
  textarea?: boolean;
  onPaste?: (e: ClipboardEvent) => any;
  errorMessage?: string;
  onValueCheck?: (valid: boolean, value: string) => void;
  onClick?: (e: any) => void;
}) {
  const [pristine, setPristine] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [valid, setValid] = useState(true);

  const isValid = (val: any, prstn = pristine) => {
    /**
     * Have to use a new RegExp object so that
     * it doesn't skip subsequent calls
     */
    return (
      disabled || prstn || (new RegExp(regex).test(val) && customValidator(val))
    );
  };

  return (
    <div
      className={cn({
        [styles.container]: true,
        [containerClassName]: !!containerClassName,
        [styles.input__invalid]: !valid || forceError,
        [styles.active]: !!value,
      })}
      onClick={onClick}
    >
      {!textarea && (
        <input
          id={id}
          maxLength={maxLength}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter();
            } else if (e.key === "Backspace" || e.key === "Delete") {
              onDelete();
            }
          }}
          className={cn({
            [styles.input]: true,
            [className]: !!className,
          })}
          type={type === "password" ? (passwordVisible ? "text" : type) : type}
          value={value}
          onChange={(e) => {
            setPristine(false);
            setValid(true);
            onChange(e.target.value, valid);
            onValueCheck(isValid(e.target.value, pristine), e.target.value);
          }}
          onPaste={(e) => {
            onPaste(e as any);
          }}
          onBlur={(e) => {
            const validVal = isValid(e.target.value, false);
            setValid(validVal);
            onValueCheck(validVal, e.target.value);
          }}
          placeholder={placeholder}
        />
      )}
      {textarea && (
        <textarea
          id={id}
          maxLength={maxLength}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter();
            } else if (e.key === "Backspace" || e.key === "Delete") {
              onDelete();
            }
          }}
          style={{
            minHeight: "150px",
          }}
          className={cn({
            [styles.input]: true,
            [className]: !!className,
          })}
          value={value}
          onChange={(e) => {
            setPristine(false);
            setValid(true);
            onChange(e.target.value, valid);
            onValueCheck(isValid(e.target.value, pristine), e.target.value);
          }}
          onBlur={(e) => {
            const validVal = isValid(e.target.value, pristine);
            setValid(validVal);
            onValueCheck(validVal, e.target.value);
          }}
          placeholder={placeholder}
        />
      )}
      {errorMessage && (!valid || forceError) && (
        <p className={styles.error}>{errorMessage}</p>
      )}
      {type === "password" && (
        <button
          onClick={() => {
            setPasswordVisible((prev) => !prev);
          }}
          className={styles.reveal__password__btn}
        >
          {!passwordVisible && (
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1136 8.68851C21.192 8.82564 21.2256 8.90915 21.2399 8.94737C21.2256 8.98559 21.192 9.0691 21.1136 9.20623C20.9867 9.42826 20.7875 9.71428 20.5156 10.0456C19.9734 10.7064 19.1808 11.5009 18.2077 12.2655C16.2458 13.807 13.6572 15.1447 11 15.1447C8.34282 15.1447 5.75417 13.807 3.79231 12.2655C2.81918 11.5009 2.0266 10.7064 1.48441 10.0456C1.21252 9.71428 1.01325 9.42826 0.88638 9.20623C0.808017 9.06909 0.774388 8.98559 0.760099 8.94737C0.774388 8.90915 0.808018 8.82564 0.88638 8.68851C1.01325 8.46648 1.21252 8.18046 1.48441 7.84909C2.0266 7.1883 2.81918 6.39382 3.79231 5.62921C5.75417 4.08776 8.34282 2.75 11 2.75C13.6572 2.75 16.2458 4.08776 18.2077 5.62921C19.1808 6.39382 19.9734 7.1883 20.5156 7.84909C20.7875 8.18046 20.9867 8.46648 21.1136 8.68851Z"
                stroke="#B4946B"
                strokeWidth="1.5"
              />
              <path
                d="M4 1L18.5625 16.5038"
                stroke="#B4946B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
          {passwordVisible && (
            <svg
              width="22"
              height="14"
              viewBox="0 0 22 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="6.94737"
                r="3.88158"
                stroke="#B4946B"
                strokeWidth="1.5"
              />
              <path
                d="M21.1136 6.68851C21.192 6.82564 21.2256 6.90915 21.2399 6.94737C21.2256 6.98559 21.192 7.0691 21.1136 7.20623C20.9867 7.42826 20.7875 7.71428 20.5156 8.04564C19.9734 8.70644 19.1808 9.50092 18.2077 10.2655C16.2458 11.807 13.6572 13.1447 11 13.1447C8.34282 13.1447 5.75417 11.807 3.79231 10.2655C2.81918 9.50092 2.0266 8.70644 1.48441 8.04564C1.21252 7.71428 1.01325 7.42826 0.88638 7.20623C0.808017 7.06909 0.774388 6.98559 0.760099 6.94737C0.774388 6.90915 0.808018 6.82564 0.88638 6.68851C1.01325 6.46648 1.21252 6.18046 1.48441 5.84909C2.0266 5.1883 2.81918 4.39382 3.79231 3.62921C5.75417 2.08776 8.34282 0.75 11 0.75C13.6572 0.75 16.2458 2.08776 18.2077 3.62921C19.1808 4.39382 19.9734 5.1883 20.5156 5.84909C20.7875 6.18046 20.9867 6.46648 21.1136 6.68851Z"
                stroke="#B4946B"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
