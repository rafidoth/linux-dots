import db_init from "config/db";
import type { User } from "types/User";

const create_user = async (user: User) => {
  const db = await db_init();
};
