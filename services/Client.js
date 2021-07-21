/**
 * HTTP Client for accessing resources from other servers
 * 5/28/2021
 * Martin Alemajoh
 */
const http = require('http');
const path = require('path');

class Client {

    /**
     * Makes an HTTP request
     * @param {object} options options used for making an http request.
     * @returns {promise} a promise that resolves with the response.
     */
    static makeRequest(options) {
        return new Promise((resolve, reject) => {
            const response = {}
            let data = "";
            const request = http.request(options, res => {

                response["statusCode"] = res.statusCode;
                response["headers"] = res.headers;

                res.setEncoding('utf8');
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    response["message"] = JSON.stringify(JSON.parse(data));
                    resolve(response);
                });
            });

            request.on('error', error => {
                reject(error);
            });

            request.end();
        });
    }
}

module.exports = Client;