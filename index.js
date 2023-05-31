const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./src/config/dbConfig");
const config = require("./src/app_config/index");
const mainRouters = require("./src/app_config/routerConfig");

const app = express();

config(app);
dbConfig();
mainRouters(app);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
