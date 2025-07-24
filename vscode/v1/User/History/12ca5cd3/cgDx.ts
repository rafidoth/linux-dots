import mysql from "mysql2";

const db_init = async () => {
  const db = mysql
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })
    .promise();
  return db;
};

export default db_init;
