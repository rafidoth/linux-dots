import db_init from "config/db";
import type { UserPayload } from "types/User";

const create_user = async (user: UserPayload) => {
  const db = await db_init();
  const query = `INSERT INTO Users ( name, email, username, password_hash, user_type, gender)
VALUES ( 'John Doe', 'john.doe@example.com', 'johndoe', 'hashed_password', 'Student', 'Male');`;
};
