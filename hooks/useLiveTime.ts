"use client";

import { useState, useEffect } from "react";

export function useLiveTime() {
  const [timeString, setTimeString] = useState<string>("00:00:00 AM");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeString, mounted };
}
