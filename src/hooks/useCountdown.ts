import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsExpired(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const daysLeft = timeLeft.days;
  let urgencyColor: "primary" | "accent-orange" | "accent-green" =
    "accent-green";
  let progress = 15;

  if (daysLeft <= 7) {
    urgencyColor = "primary";
    progress = 80;
  } else if (daysLeft <= 30) {
    urgencyColor = "accent-orange";
    progress = 40;
  }

  return {
    timeLeft,
    isExpired,
    urgencyColor,
    progress,
  };
};