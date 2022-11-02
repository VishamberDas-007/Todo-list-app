const response = require("../responses/response"); // requiring the response
require("dotenv").config();
const { List } = require("../models/list");
const moment = require("moment");
const { ObjectID } = require("bson");

// for inserting into the todo list
exports.insert = async (req) => {
	try {
		// req for the entered credentials

		const date = moment();

		// creating an instance for adding the vendor details
		const details = new List({
			title: req.body.title,
			date: req.body.date,
		});

		// saving the details into the collection
		const result = await details.save();
		console.log(result);

		// returning the response
		return response.successResponse("Data entered successfully", details);
	} catch (error) {
		console.log({ error });
		// returning the error resposne
		return response.errorResponse(
			"Error occurred while inserting the data into todo list",
			error
		);
	}
};

// for updating the todo list+++++++++++++++++++

exports.update = async (req) => {
	try {
		const id = req.params.id;
		const details = {
			title: req.body.title,
			date: req.body.date,
		};

		// find if the id is present or not
		const idPresent = await List.find({
			_id: id,
		});

		if (idPresent.length == 0) {
			return response.notFound("Invalid details");
		}

		const updateDetails = await List.findOneAndUpdate(
			{ _id: id },
			{ title: details.title, date: details.date }
		);

		const result = {
			id: id,
			title: details.title || updateDetails.title,
			date: details.date || updateDetails.date,
		};

		return response.successResponse("Record updated successfully", result);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while updating the todo list",
			error
		);
	}
};

// for deleting the todo list
exports.deleting = async (req) => {
	try {
		// requesting the id to be deleted
		const id = req.params.id;

		if (!ObjectID.isValid(id)) {
			return response.errorResponse("Object id is invalid", id);
		}

		const findID = await List.findOne({ _id: id });
		console.log({ findID });
		if (!findID) {
			return response.notFound("No such Record found");
		}
		const deleteTodo = await List.deleteOne({ _id: id });
		return response.successResponse("Record deleted successfully", findID);
	} catch (error) {
		console.log({ error });
		return response.errorResponse(
			"Error occurred while deleting the details from Todo list",
			error
		);
	}
};
