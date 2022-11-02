const { body, param, check, query } = require("express-validator");

// record insert validation
const recordInsertValidate = [
	body("title").notEmpty().withMessage("Enter the title"),
	body("date").notEmpty().isDate().withMessage("Enter the Date"),
];

// record update validation
const recordUpdateValidate = [
	check("id").not().isEmpty().withMessage("Enter the id"),
	body("title").notEmpty().withMessage("Enter the title"),
	body("date").notEmpty().isDate().withMessage("Enter the Date"),
];

module.exports = { recordInsertValidate, recordUpdateValidate };
