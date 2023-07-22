/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { clientSideRequest } from "./api";
import { useRouter } from "next/router";
import { User } from "@/types";
import { useAccount } from "wagmi";

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  /**
   * Wrapped setValue to connect it to the LocalStorage
   * @param value
   */
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as [typeof storedValue, typeof setValue];
}

export function useResize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    width,
    height,
  };
}

export function useMobileMode() {
  const { width } = useResize();
  return width < 800;
}

export function useTabletMode() {
  const { width } = useResize();
  return width < 1200;
}

export function useOnDocumentClick(listener = (event: MouseEvent) => {}) {
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [listener]);
}

export function useOnOutsideClick(
  ref: any,
  listener = (event: MouseEvent) => {}
) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const outsideClick =
        typeof event.composedPath === "function" &&
        !event.composedPath().includes(ref.current);
      if (!ref.current || !outsideClick) {
        return;
      }
      listener(event);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [ref, listener]);
}

export function useOnScroll(listener = (pos: any) => {}) {
  useEffect(() => {
    const handler = ({ target }: { target: any }) => {
      listener(target.scrollTop || window.scrollY);
    };
    document.body.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      document.body.removeEventListener("scroll", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [listener]);
}

export function useTimeout(
  listener = () => {},
  duration = 1000,
  dependencies: any[] = []
) {
  useEffect(() => {
    const timeout = setTimeout(listener, duration);
    return () => clearTimeout(timeout);
  }, dependencies);
}

export function useInterval(
  listener = () => {},
  duration = 1000,
  dependencies: any[] = []
) {
  useEffect(() => {
    const interval = setInterval(listener, duration);
    return () => clearInterval(interval);
  }, dependencies);
}

export function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);
  let observer: any;

  useEffect(() => {
    observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (observer !== null) {
      observer.observe(ref.current);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect();
      };
    }
  }, [observer]);

  return isIntersecting;
}

export function useUser() {
  const { address } = useAccount();
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      console.log(address);
      clientSideRequest("/api/user/get-by-address", {
        address,
      }).then(
        ({ user: usr }) => {
          console.log(usr);
          if (usr) {
            setUser(usr);
          } else {
            router.replace("/auth/login");
          }
        },
        (err) => {
          console.log(err);
          router.replace("/auth/login");
        }
      );
    } else {
      router.replace("/auth/login");
    }
  }, [address]);

  return user;
}
