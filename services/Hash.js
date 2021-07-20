/**
 * Hash data
 * 8/28/2021
 * Martin Alemajoh
 */

const { createHash } = require('crypto');

class Hash {

    /**
     * hashes any data using sha256
     * @param {any} data 
     * @returns {string} hash string
     */
    static hashData(data) {

        const hash = createHash('sha256');

        hash.update(data);
        return hash.digest('hex');
    }

}

module.exports = Hash;