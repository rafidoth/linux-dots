import db_init from "../config/db.js";
import type { UserType } from "../types/UserType.js";
import { v4 as uuid } from "uuid";

const create_user = async (user: UserType) => {
  try {
    // Input validation
    if (!user.email || !user.password || !user.name || !user.username) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    const db = await db_init();
    const userId = uuid();

    const query = `
      INSERT INTO Users (
        user_id, name, email, username, 
        password_hash, user_type, gender
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    await db.query(query, [
      userId,
      user.name,
      user.email,
      user.username,
      user.password, // Note: Should be hashed in production
      user.type,
      user.gender,
    ]);
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Error inserting User into db");
  }
};

export { create_user };
