import { mentorleveltype } from "../types";

export function getLevelColor(level: mentorleveltype) {
  switch (level) {
    case "beginner guide":
      return "bg-amber-500 ";
    case "uplifter":
      return "text-blue-500";
    case "pathfinder":
      return "text-green-500";
    case "illuminator":
      return "text-purple-500";
    case "trailblazer":
      return "text-red-500";
    case "master of art":
      return "text-indigo-500";
    case "legendary grandmaster":
      return "text-gold-500";
    default:
      return "text-gray-500"; // Fallback color
  }
}
