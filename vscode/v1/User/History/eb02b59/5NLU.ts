import { mentorleveltype } from "../types";

export function getLevelColor(level: mentorleveltype) {
  switch (level) {
    case "beginner guide":
      return "bg-amber-900 ";
    case "uplifter":
      return "bg-blue-500";
    case "pathfinder":
      return "bg-green-500";
    case "illuminator":
      return "bg-purple-500";
    case "trailblazer":
      return "bg-red-500";
    case "master of art":
      return "bg-indigo-500";
    case "legendary grandmaster":
      return "bg-gold-500";
    default:
      return "text-gray-500"; // Fallback color
  }
}
