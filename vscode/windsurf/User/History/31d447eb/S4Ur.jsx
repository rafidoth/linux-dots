import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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
  return;
}

export default Countdown;
