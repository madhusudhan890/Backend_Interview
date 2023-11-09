const MySQL = require("mysql2");
const tables = `
    CREATE TABLE IF NOT EXISTS users(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    userName varchar(36) UNIQUE NOT NULL,
    \`password\` VARCHAR(255) NOT NULL,
    isActive INT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services(
    serviceId INT AUTO_INCREMENT PRIMARY KEY,
    serviceName VARCHAR(36) NOT NULL,
    isActive INT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders(
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    date DATE ,
    totalfee INT NOT NULL,
    serviceId INT REFERENCES services(serviceId),
    userId INT REFERENCES users(userId),
    isActive INT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

   
`;

if (process.env.CREATETABLE === "true") {
  const connection = MySQL.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: 3306,
    multipleStatements: true,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    // console.log("Connected to MySQL!");
    connection.query(tables, (err, results) => {
      if (err) {
        console.error("Error creating the table:", err);
      } else {
        console.log("Table created successfully.");
      }
      connection.end();
    });
  });
}

module.exports = tables;
