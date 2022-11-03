const { body, param, check, validationResult } = require("express-validator");
const response = require("../responses/response");

// record insert validation
const recordInsertValidate = [
	body("title").notEmpty().withMessage("Enter the title"),
	body("date").notEmpty().isDate().withMessage("Enter the Date"),
];

// record update validation
const recordUpdateValidate = [
	check("id").notEmpty().withMessage("Enter the id"),
	body("title").notEmpty().withMessage("Enter the title"),
	body("date").notEmpty().isDate().withMessage("Enter the Date"),
];

module.exports = {
	recordInsertValidate,
	recordUpdateValidate,
};
