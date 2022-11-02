const express = require("express"); // importing the express package
const routes = express.Router(); // initializing routes
const crud = require("../controllers/crud"); // importing the crud from the controller
const { validationResult } = require("express-validator");
const validate = require("../validations/validate");

// post request for the data insertion
routes.post("/insert", validate.recordInsertValidate, async (req, res) => {
	//validation result
	const errors = await validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	// controller result
	let result = await crud.insert(req);
	return res.status(result.status).json(result);
});

// patch request for the data updation
routes.patch("/update/:id", validate.recordUpdateValidate, async (req, res) => {
	//validation result
	const errors = await validationResult(req);

	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	// controller result
	let result = await crud.update(req);
	return res.status(result.status).json(result);
});

// delete request for the data deletion
routes.delete("/delete/:id", async (req, res) => {
	let result = await crud.deleting(req);
	return res.status(result.status).json(result);
});

// get request for the data listing
routes.get("/listing", async (req, res) => {
	let result = await crud.listing(req);
	return res.status(result.status).json(result);
});

// exporting the routes
module.exports = routes;
