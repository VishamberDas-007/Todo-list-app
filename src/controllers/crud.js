const response = require("../responses/response"); // requiring the response
require("dotenv").config();
const { List } = require("../models/list");
// const moment = require("moment");
const { ObjectID } = require("bson");

// for inserting into the todo list
exports.insert = async (req) => {
	try {
		// const date = moment();

		// creating an instance for adding the vendor details
		const details = new List({
			title: req.body.title,
			date: new Date(req.body.date),
		});

		// saving the details into the collection
		const result = await details.save();

		// returning the response
		return response.successResponse("Data entered successfully", details);
	} catch (error) {
		// returning the error resposne
		return response.errorResponse(
			"Error occurred while inserting the data into todo list",
			error
		);
	}
};

// for updating the todo list
exports.update = async (req) => {
	try {
		const id = req.params.id;
		const details = {
			title: req.body.title,
			date: req.body.date,
		};
		if (!ObjectID.isValid(id)) {
			return response.errorResponse("Id is invalid", id);
		}

		// find if the id is present or not
		const idPresent = await List.find({
			_id: id,
		});

		if (idPresent.length == 0) {
			return response.notFound("No such record found");
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

		if (!findID) {
			return response.notFound("No such Record found");
		}
		const deleteTodo = await List.deleteOne({ _id: id });
		return response.successResponse("Record deleted successfully", findID);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while deleting the details from Todo list",
			error
		);
	}
};

// listing the todo records
exports.listing = async (req) => {
	try {
		const { page, pageSize, fromDate, toDate } = req.query; // requesting for the params
		let records;
		// creating an object to check the date range
		const checkDateRange = {
			date: { $gte: fromDate, $lt: toDate },
		};

		// if all the constraints exists
		if (
			req.query.page &&
			req.query.pageSize &&
			req.query.fromDate &&
			req.query.toDate
		) {
			// passing that object along with the page limit and page number
			records = await List.find(checkDateRange)
				.limit(pageSize * 1)
				.skip((page - 1) * pageSize);
		} else if (req.query.page && req.query.pageSize) {
			// if only page and page size are given as inputs
			records = await List.find()
				.limit(pageSize * 1)
				.skip((page - 1) * pageSize);
		} else {
			// otherthan the above two conditions this will execute
			records = await List.find();
		}

		// checking if the record's length is 0
		if (records.length == 0) {
			return response.notFound("Record is empty");
		} else {
			// else returning the response
			return response.successResponse("Records found successfully ", {
				total: records.length,
				records,
			});
		}
	} catch (error) {
		// returning the error response
		return response.errorResponse(
			"Error occurred while listing the records",
			error
		);
	}
};
