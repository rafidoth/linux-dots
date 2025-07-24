import { getUserQuizsets } from "../services/supabase.js";

export async function getUserQuizsetsController(req, res) {
  try {
    const userId = req.headers["x-user-id"] || req.query.userId;
    const limit = parseInt(req.query.limit) || 10;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const quizsets = await getUserQuizsets(userId, limit);

    res.status(200).json({
      success: true,
      data: quizsets,
    });
  } catch (error) {
    console.error("Error in getUserQuizsetsController:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user quizsets",
    });
  }
}
