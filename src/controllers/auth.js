const response = require("../responses/response"); // requiring the response
require("dotenv").config();
const jwt = require("jsonwebtoken"); // requiring json web token

// for logging in
exports.login = async (req) => {
	try {
		// req for the entered credentials
		const credentials = {
			email: req.body.email,
			password: req.body.password,
		};

		if (
			credentials.email === process.env.email &&
			credentials.password === process.env.password
		) {
			// signimg a token
			let token = jwt.sign({ credentials }, process.env.SECRET_KEY, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			});

			// returning the response
			return response.successResponse("Login successfull", { token });
		} else {
			// returning the response
			return response.notFound("Invalid credentials");
		}
	} catch (error) {
		console.log({ error });
		// returning the error resposne
		return response.errorResponse("Error occurred while logging in", error);
	}
};
