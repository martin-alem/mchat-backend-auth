/**
 * Manages database connection
 * @date 8/28/2021
 * @author Martin Alemajoh
 */

const mysql = require("mysql");
const path = require("path");
const Logger = require(path.join(__dirname, "../utils/Logger"));

let connection = null;

class MysqlDatabase {

	constructor(config) {

		if (connection === null) {
			connection = mysql.createConnection(config);
			connection.connect(error => {
				if (error) {
					Logger.logError(error, __filename, new Date());
					throw new Error("Couldn't connect to database");
				}
				else {
					Logger.logInfo("Database connection established", __filename, new Date());
				}
			});
		}

		return connection;
	}

}

module.exports = MysqlDatabase;