/**
 * Logger class for logging messages
 * 2/28/2021
 * Martin Alemajoh
 */

const path = require("path");
const fs = require('fs/promises');
const chalk = require('chalk');
const Helper = require(path.join(__dirname, "../utils/Helper"));


class Logger {

    /**
     * Logs error messages to console in development mode and to file in production mode.
     * @param {string} message error message
     * @param {string} file  file name
     * @param {Date} date  date
     */
    static logError(message, file, date) {

        const flag = "ERROR";

        if (process.env.NODE_ENV === "development") {
            Logger.logToConsole(flag, message, file, date);
        }

        else if (process.env.NODE_ENV === "production") {
            Logger.logToFile(flag, message, file, date);

        }

    }

    /**
     * Logs informational messages to console in development mode and to file in production mode.
     * @param {string} message error message
     * @param {string} file  file name
     * @param {Date} date  date
     */
    static logInfo(message, file, date) {
        const flag = "INFO";

        if (process.env.NODE_ENV === "development") {
            Logger.logToConsole(flag, message, file, date);
        }

        else if (process.env.NODE_ENV === "production") {
            Logger.logToFile(flag, message, file, date);

        }
    }

    /**
     * Logs warning messages to console in development mode and to file in production mode.
     * @param {string} message error message
     * @param {string} file  file name
     * @param {Date} date  date
     */
    static logWarning(message, file, date) {

        const flag = "WARNING";

        if (process.env.NODE_ENV === "development") {
            Logger.logToConsole(flag, message, file, date);
        }

        else if (process.env.NODE_ENV === "production") {
            Logger.logToFile(flag, message, file, date);

        }
    }

    /**
     * Actual writing to stdout
     * @param {string} flag type of logging
     * @param {string} message message
     * @param {string} file file name
     * @param {Date} date date
     */
    static logToConsole(flag, message, file, date) {

        const str = `[${flag}] --- ${message} --- ${file} --- ${date}`;
        const color = Helper.getColor(flag);
        console.log(chalk[color].bold(str));
    }


    /**
     * Actual writing to file
     * @param {string} flag type of logging
     * @param {string} message message
     * @param {string} file file name
     * @param {Date} date date
     */
    static async logToFile(flag, message, file, date) {
        const logDir = path.join(__dirname, "../log", `${Helper.getDate()}.log`);
        const str = `[${flag}] --- ${message} --- ${file} --- ${date}\r\n`;
        await Logger.writeToFile(logDir, str);
    }

    /**
     * Writes to disk
     * @param {string} file file name
     * @param {string} message message
     */
    static async writeToFile(file, message) {

        try {
            const fileHandle = await fs.open(file, "a");
            const result = await fileHandle.appendFile(message);
            if (!result) {
                console.log(chalk.cyanBright.bold("Log data successfully written to file"));
            }
            await fileHandle.close();
        } catch (error) {
            Logger.logError(error, path.dirname(__filename), 90, new Date());
        }
    }

}

module.exports = Logger;