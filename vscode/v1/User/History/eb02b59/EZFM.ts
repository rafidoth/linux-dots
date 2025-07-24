import { mentorleveltype } from "../types";

export function getLevelColor(level: mentorleveltype) {
  if (level === "beginner guide") {
    return "text-amber-500";
  }
}
