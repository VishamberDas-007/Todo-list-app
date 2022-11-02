const express = require("express"); // importing the express package
const routes = express.Router(); // initializing routes
const { login } = require("../controllers/auth"); // importing the register from the controller

// get request for the login of the user
routes.get("/login", async (req, res) => {
	let result = await login(req);
	return res.status(result.status).json(result);
});

// exporting the routes
module.exports = routes;
