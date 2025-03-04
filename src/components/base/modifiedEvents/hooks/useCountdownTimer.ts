import { useState, useEffect } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const useCountdownTimer = (targetHour = 18, targetMinute = 15) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const eventTime: Date = new Date();
    eventTime.setHours(targetHour, targetMinute, 0, 0);

    if (eventTime < now) {
      eventTime.setDate(eventTime.getDate() + 1);
    }

    const diff = eventTime.getTime() - now.getTime();

    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};
