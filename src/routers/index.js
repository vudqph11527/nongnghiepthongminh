const home = require("./homeRouter");
const login = require("./loginRouter");
const register = require("./registerRouter");
const sensor = require("./sensorDeviceRouter");
const tree = require("./treeRouter");

const Router = (app) => {
  app.use("/", home);
  app.use("/api", tree);
  app.use("/api", sensor);
  app.use("/api", login);
  app.use("/api", register);
};

module.exports = Router;
