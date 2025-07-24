const mysql = require("mysql2");
const db_init = async () => {
  const db = mysql
    .createPool({
      host: process.env.DB_HOST,
      user: "root",
      password: "asda",
      database: "ument",
    })
    .promise();
  return db;
};

export default db_init;
