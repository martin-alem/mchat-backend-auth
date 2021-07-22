/**
 * @author Martin Alemajoh
 * @description This is the main entry point for the service.
 * @date 7/19/2021
 */

require("dotenv").config();

const http = require("http");
const path = require("path");
const app = require(path.join(__dirname, "app"));
const Logger = require(path.join(__dirname, "./utils/Logger"));



//configurations for http server
const protocol = "http";
const option = {};
const httpServer = http.createServer(option, app);



const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

//initializing and starting server.
httpServer.listen(PORT, HOST, () => {
	Logger.logInfo(`Authentication Server Started: ${protocol}://${HOST}:${PORT}`, __filename, new Date());
});