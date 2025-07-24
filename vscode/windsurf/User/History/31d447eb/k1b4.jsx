import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useState } from "react";
import { useEffect } from "react";

function getRemainingTime(targetDate) {
  const now = new Date();
  const days = differenceInDays(targetDate, now);
  const hours = differenceInHours(targetDate, now) % 24;
  const minutes = differenceInMinutes(targetDate, now) % 60;
  const seconds = differenceInSeconds(targetDate, now) % 60;

  return { days, hours, minutes, seconds };
}
function getFormattedRemainingTime(time) {
  const { days, hours, minutes, seconds } = time;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function Countdown({ startTime }) {
  const remainingTime = getRemainingTime(startTime);
  const [rTimeStr, setRTimeStr] = useState(
    getFormattedRemainingTime(remainingTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = getRemainingTime(startTime);
      const newRTimeStr = getFormattedRemainingTime(newRemainingTime);
      setRTimeStr(newRTimeStr);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return <div>{rTimeStr}</div>;
}

export default Countdown;
