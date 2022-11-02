const express = require("express"); // importing the express package
const routes = express.Router(); // initializing routes
const crud = require("../controllers/crud"); // importing the crud from the controller

// post request for the data insertion
routes.post("/insert", async (req, res) => {
	let result = await crud.insert(req);
	return res.status(result.status).json(result);
});

// patch request for the data updation
routes.patch("/update/:id", async (req, res) => {
	let result = await crud.update(req);
	return res.status(result.status).json(result);
});

// delete request for the data deletion
routes.delete("/delete/:id", async (req, res) => {
	let result = await crud.deleting(req);
	return res.status(result.status).json(result);
});

// exporting the routes
module.exports = routes;
