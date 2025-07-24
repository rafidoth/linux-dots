const mysql = require("mysql2");
export const db_init = async () => {
  const pool = mysql
    .createPool({
      host: "127.0.0.1",
      user: "root",
      password: "asda",
      database: "ument",
    })
    .promise();
  return pool;
};
