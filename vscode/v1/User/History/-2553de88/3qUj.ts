import db_init from "config/db";
import type { UserInsert } from "types/User";
import { v4 as uuid } from "uuid";

const create_user = async (user: UserInsert) => {
  const db = await db_init();
  const query = `INSERT INTO Users 
  (user_id, name, email, username, password_hash, user_type, gender)
   VALUES ( ?,?,?,?,?,?,?);`;
  const rows = await db.query(query, [
    uuid(),
    user.name,
    user.email,
    user.username,
    user.password,
    user.type,
    user.gender,
  ]);
  console.log(rows);
  return rows;
};
