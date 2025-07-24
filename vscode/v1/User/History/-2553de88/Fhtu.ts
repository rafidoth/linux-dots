import db_init from "config/db";
import type { UserInsert } from "types/User";
import { v4 } from "uuid/v4";

const create_user = async (user: UserInsert) => {
  const db = await db_init();
  const query = `INSERT INTO Users 
  (user_id, name, email, username, password_hash, user_type, gender)
   VALUES ( ?,?,?,?,?,?);`;
  const response = await db.query(query, [
    user.name,
    user.email,
    user.username,
    user.password,
    user.type,
    user.gender,
  ]);
};
