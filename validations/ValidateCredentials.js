/**
 * @author Martin Alemajoh
 * @description This class contains methods to validate
 * @date 7/19/2021
 */


class ValidateCredentials {

	/**
     * Validates a password and makes sure it adheres to the regex
     * @param {string} password password to validate
     * @returns {boolean} true if the password is valid false otherwise
     */
	static isValidPassword(password) {

		const ch = [
			["!", 1],
			["@", 2],
			["#", 3],
			["$", 4],
			["%", 5],
			["^", 6],
			["&", 7],
			["*", 8],
			["(", 9],
			[")", 10],
			["-", 11],
			["_", 12],
			["=", 13],
			["+", 14]
		];
		const validCharacters = new Map(ch);
		let characters = false;
		let numbers = false;
		let capLetters = false;
		let length = false;

		if ((password.length >= 6 && password.length <= 30)) {
			length = true;
			for (let i = 0; i < password.length; i += 1) {

				if (!characters && validCharacters.has(password[i])) {
					characters = true;
				}
				if (!numbers && (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)) {
					numbers = true;
				}
				if (!capLetters && (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)) {
					capLetters = true;
				}
			}
		}

		return (characters && numbers && capLetters && length);
	}

	/**
     * Validated the phone to make sure it adheres to the regex
     * @param {string} phone phone to validate
     * @returns {boolean} true if phone is valid false otherwise
     */
	static isValidPhone(phone) {
		return /^[0-9]{10}$/gmi.test(phone);
	}

}

module.exports = ValidateCredentials;