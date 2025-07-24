import mysql, { PoolConnection } from "mysql2";

const db_init = async () => {
  const access: PoolConnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
  const db = mysql.createPool({}).promise();
  return db;
};

export default db_init;
