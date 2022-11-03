const express = require("express"); // importing the express package
const routes = express.Router(); // initializing routes
const { login } = require("../controllers/auth"); // importing the register from the controller
const validate = require("../validations/validate");
const { validationResult } = require("express-validator");

// get request for the login of the user
routes.get("/login", validate.loginValidate, async (req, res) => {
	//validation result
	const errors = await validationResult(req);

	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	//controller result
	let result = await login(req);
	return res.status(result.status).json(result);
});

// exporting the routes
module.exports = routes;
