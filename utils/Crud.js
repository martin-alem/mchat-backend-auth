/**
 * CRUD operations
 * 8/28/2021
 * Martin Alemajoh
 */

const fs = require("fs");
const path = require("path");
const Logger = require(path.resolve(__dirname, "./Logger"))

class CRUD {

    /**
     * Read data from a file and returns the content as a string.
     * @param {string} filename file name.
     * @returns {promise} promise resolved with the data from the file.
     */
    static read(filename) {

        const location = path.join(__dirname, "../data", filename);
        return new Promise((resolve, reject) => {
            fs.readFile(location, { encoding: 'utf8', flag: "r" }, (err, data) => {
                if (err) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(err);
                }
                resolve(data);
            });
        });
    }


    /**
     * Writes data to a file and returns a promise that resolves to true.
     * @param {string} filename file name.
     * @param {string} data data to be written to file.
     * @returns {promise} promise resolved with true.
     */
    static write(filename, data, mode) {
        const location = path.join(__dirname, "../data", filename);
        return new Promise((resolve, reject) => {
            fs.writeFile(location, data, { encoding: "utf8", flag: mode }, error => {
                if (error) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(error);
                }
                resolve(true);
            });
        });
    }
}

module.exports = CRUD;