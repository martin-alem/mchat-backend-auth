/**
 * Manages database connection
 * @date 8/28/2021
 * @author Martin Alemajoh
 */

const mysql = require("mysql");
const path = require("path");
const Logger = require(path.join(__dirname, "../utils/Logger"))

class MysqlDatabase {

    static connection = null;

    constructor(config) {

        if (MysqlDatabase.connection === null) {
            MysqlDatabase.connection = mysql.createConnection(config);
            MysqlDatabase.connection.connect(error => {
                if (error) {
                    Logger.logError(err.message, __filename, new Date());
                    throw new Error("Couldn't connect to database");
                }
                else {
                    Logger.logInfo("Database connection established", __filename, new Date());
                }
            });
        }

        return MysqlDatabase.connection;
    }

}

module.exports = MysqlDatabase;