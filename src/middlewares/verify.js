const jwt = require("jsonwebtoken");
require("dotenv").config();

// function to verify the token
function jwtVerify(req, res) {
	const token = req.headers.authorization;
	if (token == undefined)
		return res.status(404).json({
			message: "Token required",
		});

	const bearerHeader = token.split(" ");
	const bearer = bearerHeader[1];
	const tokenData = jwt.verify(bearer, process.env.SECRET_KEY);
	console.log({ tokenData });
	return tokenData;
}

function isAdmin(req, res, next) {
	try {
		const tokenData = jwtVerify(req, res);

		// check if the tokenData has the same roleID as of Admin
		// If not then return invalid attempt to access
		if (
			tokenData.credentials != process.env.email &&
			tokenData.credentials.password != process.env.password
		)
			return res.status(404).json({ message: "Invalid attempt to access" });

		return next();
	} catch (error) {
		// console.log({ error });
		return res.status(400).json(error);
	}
}

module.exports = { isAdmin };
