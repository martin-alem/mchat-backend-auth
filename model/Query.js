/**
 * Database query
 * 8/28/2021
 * Martin Alemajoh
 */
const path = require("path");
const Database = require(path.join(__dirname, "./Database"));
const Logger = require(path.join(__dirname, "../utils/Logger"));

const databaseConfig = {
	host: process.env.D_HOST || "mchat-do-user-9421788-0.b.db.ondigitalocean.com",
	user: process.env.D_USER || "doadmin",
	password: process.env.D_PASSWORD || "whbacznuqs0712s9",
	database: process.env.DATABASE || "test_mchat",
	port: process.env.D_PORT || 25060,
	sslmode: process.env.SSL_MODE || "REQUIRED"
};

const connection = new Database(databaseConfig);

class Query {

	/**
	 * Inserts a specific record in the table
	 * @param {string} tableName 
	 * @param {object} value 
	 * @returns {promise} promise resolves with the query result.
	 */
	static insert(tableName, value) {
		return new Promise((resolve, reject) => {

			connection.query(`INSERT INTO ${tableName} SET ?`, value, (err, result) => {
				if (err) {
					Logger.logError(err, __filename, new Date());
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
			connection.query(`SELECT * FROM ${tableName}`, (err, result) => {

				if (err) {
					Logger.logError(err, __filename, new Date());
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
			connection.query(`SELECT * FROM ${tableName} WHERE ${field} = '${value}'`, (err, result) => {

				if (err) {
					Logger.logError(err, __filename, new Date());
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
			connection.query(`UPDATE ${tableName} SET ${uField} = '${uValue}' WHERE ${field} = '${value}'`, (err, result) => {

				if (err) {
					Logger.logError(err, __filename, new Date());
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
				connection.query(`UPDATE ${tableName} SET ${key} = '${updateObject[key]}' WHERE ${uField} = '${uValue}'`, (err, result) => {

					if (err) {
						Logger.logError(err, __filename, new Date());
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
			connection.beginTransaction(error => {

				if (error) {
					Logger.logError(error, __filename, new Date());
					reject(error);
				}

				connection.query(transactions[0]["query"], transactions[0]["value"], (err, result) => {
					if (err) {
						Logger.logError(err, __filename, new Date());
						connection.rollback(err => {
							Logger.logWarning(err, __filename, new Date());
						});
						reject(err);
					}
					connection.query(transactions[1]["query"], transactions[1]["value"], (err, result) => {
						if (err) {
							Logger.logWarning(err, __filename, new Date());
							connection.rollback(err => {
								Logger.logWarning(err, __filename, new Date());
							});
							reject(err);
						}

						connection.commit(error => {
							if (error) {
								Logger.logError(error, __filename, new Date());
								connection.rollback(error => {
									Logger.logWarning(error, __filename, new Date());
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
