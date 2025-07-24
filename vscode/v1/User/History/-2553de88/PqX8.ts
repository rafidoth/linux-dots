import db_init from "config/db";
import type { UserPayload } from "types/User";

const create_user = async (user: UserPayload) => {
  const db = await db_init();
};
