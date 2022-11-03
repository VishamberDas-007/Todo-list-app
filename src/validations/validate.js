const { body, param, check, query } = require("express-validator");
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

// login validation
const loginValidate = [
	body("email").notEmpty().withMessage("Enter the email"),
	body("password").notEmpty().withMessage("Enter the password"),
];

module.exports = {
	recordInsertValidate,
	recordUpdateValidate,
	loginValidate,
};
