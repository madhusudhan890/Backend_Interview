require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
require("./config/dbConfig");
require("./models/models");
const route = require("./routes/routes");

app.use(express.json());

app.use("/v1/api", route);

app.listen(process.env.PORT || 3000, (error) => {
  if (error) throw error;

  console.log(`Server is running at Port ${process.env.PORT || 3000}`);
});
