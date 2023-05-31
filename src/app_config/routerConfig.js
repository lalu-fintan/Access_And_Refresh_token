const dataRouter = require("../router/dataRouter");
const authRouter = require("../router/authRouter");

const mainRouters = (app) => {
  app.use("/auth", authRouter);
  app.use("/data", dataRouter);
};

module.exports = mainRouters;
