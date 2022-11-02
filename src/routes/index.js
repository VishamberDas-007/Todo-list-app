const express = require("express"); // importing the express package
const routes = express.Router(); // initializing routes
const verify = require("../middlewares/verify");
routes.use("/auth", require("./auth"));

routes.use("/crud", verify.isAdmin, require("./crud"));

module.exports = routes;
