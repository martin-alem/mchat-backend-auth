/**
 * Database query
 * 8/28/2021
 * Martin Alemajoh
 */
const path = require("path");
const Database = require(path.join(__dirname, "./Database"));
const Logger = require(path.join(__dirname, "../utils/Logger"))

const databaseConfig = {
    host: process.env.D_HOST || "localhost",
    user: process.env.D_USER || "root",
    password: process.env.D_PASSWORD || "",
    database: process.env.DATABASE || "mchat",
    port: process.env.D_PORT || 3306,
    sslmode: process.env.SSL_MODE
}

class Query {

    static connection = new Database(databaseConfig);

    /**
     * Inserts a specific record in the table
     * @param {string} tableName 
     * @param {object} value 
     * @returns {promise} promise resolves with the query result.
     */
    static insert(tableName, value) {
        return new Promise((resolve, reject) => {

            Query.connection.query(`INSERT INTO ${tableName} SET ?`, value, (err, result) => {
                if (err) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(err);
                }
                else {
                    resolve(result.insertId);
                }
            });
        });
    }

    /**
     * Selects all records in th table
     * @param {string} tableName name of the table 
     * @returns {promise} promise resolves with the query result
     */
    static selectAll(tableName) {

        return new Promise((resolve, reject) => {
            Query.connection.query(`SELECT * FROM ${tableName}`, (err, result) => {

                if (err) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Selects a specific record in th table
     * @param {string} tableName name of the table
     * @param {string} field name of table column
     * @param {any} value value
     * @returns {promise} promise resolves with the query result
     */
    static selectOne(tableName, field, value) {

        return new Promise((resolve, reject) => {
            Query.connection.query(`SELECT * FROM ${tableName} WHERE ${field} = '${value}'`, (err, result) => {

                if (err) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Updates a specific record in th table
     * @param {string} tableName name of the table
     * @param {string} uField update column
     * @param {string} uValue update value
     * @param {string} field table column
     * @param {string} value value
     * @returns {promise} promise resolves with the query result
     */
    static updateOne(tableName, uField, uValue, field, value) {

        return new Promise((resolve, reject) => {
            Query.connection.query(`UPDATE ${tableName} SET ${uField} = '${uValue}' WHERE ${field} = '${value}'`, (err, result) => {

                if (err) {
                    Logger.logError(err.message, __filename, new Date());
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Updates multiple rows in th table
     * @param {string} tableName table name
     * @param {object} updateObject update object
     * @param {string} uField field to update
     * @param {string} uValue value used to update
     * @returns {promise} promise that resolves with the updated id
     */
    static updateMany(tableName, updateObject, uField, uValue) {

        return new Promise((resolve, reject) => {
            let updatedRows;
            for (const key in updateObject) {
                Query.connection.query(`UPDATE ${tableName} SET ${key} = '${updateObject[key]}' WHERE ${uField} = '${uValue}'`, (err, result) => {

                    if (err) {
                        Logger.logError(err.message, __filename, new Date());
                        reject(err);
                    }
                    updatedRows = result.affectedRows;
                });
            }
            resolve(updatedRows);
        });
    }

    /**
     * Performs two operations and rollback if any failed.
     * @param {Array} transactions array of transactions
     * @returns {promise} promise that will be resolved to true
     */
    static performTransaction(transactions) {

        return new Promise((resolve, reject) => {
            Query.connection.beginTransaction(error => {

                if (error) {
                    Logger.logError(error.message, __filename, new Date());
                    reject(error);
                }

                Query.connection.query(transactions[0]["query"], transactions[0]["value"], (err, result) => {
                    if (err) {
                        Logger.logError(err.message, __filename, new Date());
                        connection.rollback(err => {
                            Logger.logWarning(err.message, __filename, new Date());
                        });
                        reject(err);
                    }
                    Query.connection.query(transactions[1]["query"], transactions[1]["value"], (err, result) => {
                        if (err) {
                            LLogger.logWarning(err.message, __filename, new Date());
                            connection.rollback(err => {
                                Logger.logWarning(err.message, __filename, new Date());
                            });
                            reject(err);
                        }

                        Query.connection.commit(error => {
                            if (error) {
                                Logger.logError(err.message, __filename, new Date());
                                connection.rollback(error => {
                                    Logger.logWarning(error.message, __filename, new Date());
                                });
                                reject(error);
                            }
                            resolve(true);
                        });
                    });
                });
            });
        });

    }
}

module.exports = Query;
