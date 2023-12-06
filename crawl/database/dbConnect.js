const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  database: process.env.DATABASE,
  waitForConnections: true,
  password: process.env.PASSWORDDB,
});

module.exports = pool;
