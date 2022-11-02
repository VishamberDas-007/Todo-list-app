const express = require("express");
const expressApp = express();
require("dotenv").config(); // requiring .env
require("./src/db/conn");
const bodyParser = require("body-parser"); // importing body-parser package
expressApp.use(bodyParser.json()); // parses the json format
expressApp.use(bodyParser.urlencoded({ extended: true })); // enhances to get the urlencoded

const PORT = process.env.PORT; // initializing the port number
const routes = require("./src/routes/index");

expressApp.use("/api", routes);

// listening the server on a port number
expressApp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
