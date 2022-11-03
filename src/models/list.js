const mongoose = require("mongoose");

// defining the schema

const todoListDetails = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

// collection creation
const List = new mongoose.model("List", todoListDetails);

module.exports = { List };
