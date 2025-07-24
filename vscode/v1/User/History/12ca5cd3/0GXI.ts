const mysql = require("mysql2");
const db_init = async () => {
  const db = mysql
    .createPool({
      host: "127.0.0.1",
      user: "root",
      password: "asda",
      database: "ument",
    })
    .promise();
  return db;
};

export default db_init;
