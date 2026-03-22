import { useEffect, useState, useCallback, useMemo } from "react";

const STORAGE_KEY = "timer";

export function useTimer() {
  const [seconds, setSeconds] = useState(() => {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  });
  const [status, setStatus] = useState("paused");

  useEffect(() => {
    if (status === "paused") return;

    const increment = status === "bank" ? 1 : -1;
    const interval = setInterval(() => {
      setSeconds((s) => {
        const next = s + increment;
        localStorage.setItem(STORAGE_KEY, next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "paused" || !("wakeLock" in navigator)) return;

    let lock = null;
    const requestLock = async () => {
      try {
        lock = await navigator.wakeLock.request("screen");
      } catch {}
    };

    requestLock();
    return () => lock?.release();
  }, [status]);

  const bankTime = useCallback(() => setStatus("bank"), []);
  const useTime = useCallback(() => setStatus("use"), []);
  const pause = useCallback(() => setStatus("paused"), []);
  const reset = useCallback(() => {
    setStatus("paused");
    setSeconds(0);
    localStorage.setItem(STORAGE_KEY, 0);
  }, []);

  const time = useMemo(() => {
    const sign = seconds < 0 ? "-" : "";
    const time = new Date(Math.abs(seconds) * 1000)
      .toISOString()
      .substring(11, 19);
    return `${sign}${time}`;
  }, [seconds]);

  return { time, status, bankTime, useTime, pause, reset };
}
