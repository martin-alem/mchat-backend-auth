/**
 * @author Martin Alemajoh
 * @description This controller handles signup requests
 * @date 7/19/2021
 */

const path = require("path");
const Controller = require(path.join(__dirname, "./Controller"));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));

class LogoutController extends Controller {

	static logout(req, res) {
		const statusCode = 200;
		const message = "User logout successful";
		res.cookie("authentication", "", { expires: 0, httpOnly: true, secure: true, sameSite: "None" });
		SendResponse.successResponse(statusCode, req, res, message);
	}
}

module.exports = LogoutController;