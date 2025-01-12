"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_NOT_FOUND_KEY = "remaining_hearts";

const localStorageValue =
  typeof window !== "undefined"
    ? localStorage.getItem(LOCAL_STORAGE_NOT_FOUND_KEY)
    : null;
const remainingHearts = localStorageValue
  ? parseInt(localStorageValue as string)
  : 2;

export default function NotFound() {
  const [notFoundPath, setNotFoundPath] = useState<string>(
    "/images/not-found/not_found_2_left.png"
  );
  const { theme } = useTheme();

  useEffect(() => {
    if (remainingHearts === -1) {
      setNotFoundPath(
        `/images/not-found/not_found_you_got_it${
          theme === "light" ? "_white" : ""
        }.png`
      );
      localStorage.removeItem(LOCAL_STORAGE_NOT_FOUND_KEY);
      return;
    }

    switch (theme) {
      case "dark":
        setNotFoundPath(
          `/images/not-found/not_found_${remainingHearts}_left.png`
        );
        break;
      case "light":
        setNotFoundPath(
          `/images/not-found/not_found_${remainingHearts}_left_white.png`
        );
        break;
      default:
        setNotFoundPath(
          `/images/not-found/not_found_${remainingHearts}_left.png`
        );
        break;
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      if (remainingHearts > -1) {
        localStorage.setItem(
          LOCAL_STORAGE_NOT_FOUND_KEY,
          (remainingHearts - 1).toString()
        );
      }
    };
  }, [remainingHearts]);

  return (
    <div className="container">
      <Link href="/">
        <Image
          src={notFoundPath}
          alt="not found"
          width={1080}
          height={1920}
          className="w-full lg:w-1/2 mx-auto"
        />
      </Link>
    </div>
  );
}
