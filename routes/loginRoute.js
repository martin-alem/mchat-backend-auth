/**
 * @author Martin Alemajoh
 * @description This route handles request made to /signup route
 * @date 7/19/2021
 */

const path = require("path");
const express = require("express");
const router = express.Router({ caseSensitive: true });

const Logger = require(path.join(__dirname, "../utils/Logger"));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const LoginController = require(path.join(__dirname, "../controllers/LoginController"));
const LogoutController = require(path.join(__dirname, "../controllers/LogoutController"));

router.post("/login", LoginController.middleware(), (req, res) => {
	LoginController.login(req, res);
});

router.get("/logout", (req, res) => {
	LogoutController.logout(req, res);
});

router.use((error, req, res, next) => {
	Logger.logError(error.error, __filename, new Date());
	SendResponse.failedResponse(error.statusCode, req, res, error.error);
});

module.exports = router;