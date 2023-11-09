const MySQL = require("mysql2/promise");

const connection = MySQL.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // port: 3306,
  multipleStatements: true,
  queueLimit: 10,
});

if (connection) {
  console.log("Database is connected");
}

module.exports = connection;
