"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionLocaleReset({ locale }: { locale: string }) {
  const router = useRouter();

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("session-started")) {
        sessionStorage.setItem("session-started", "1");
        if (locale !== "id") {
          router.replace("/id");
        }
      }
    } catch (e) {}
  }, []);

  return null;
}
