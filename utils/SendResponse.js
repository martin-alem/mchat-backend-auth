/**
 * @author Martin Alemajoh
 * @description This class contains methods to send responses to the client.
 * @date 7/19/2021
 */

class SendResponse {

    /**
     * Sends a success response to the client
     * @param {number} statusCode http status code
     * @param {object} headers optional http headers
     * @param {string} message  optional body
     * @param {object} req request object
     * @param {object} res responses object 
     */
    static successResponse(statusCode, req, res, message = "", headers = {}) {
        res.type("json");
        res.status(statusCode);
        res.set("Access-Control-Allow-Origin", `${req.hostname}`);
        res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set("Access-Control-Allow-Credentials", false);
        res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials");
        res.set("Access-Control-Max-Age", 86400);
        res.set("Date", new Date().toUTCString());
        res.set("Connection", "keep-alive");
        res.set("X-Powered-By", "mchat");

        // if the headers contain information add the res.
        if (Object.keys(headers).length > 0) {
            for (var key in headers) {
                res.set(key, headers[key])
            }
        }

        const responseObject = {
            "status": "success",
            "response": {
                "message": message,
                "error": null
            }
        }
        return res.json(responseObject);
    }


    /**
     * Sends a failed response to the client
     * @param {number} statusCode http status code
     * @param {string} error  error message
     * @param {object} req request object
     * @param {object} res responses object 
     */
    static failedResponse(statusCode, req, res, error) {
        res.type("json");
        res.status(statusCode);
        res.set("Access-Control-Allow-Origin", `${req.hostname}`);
        res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.set("Access-Control-Allow-Credentials", false);
        res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials");
        res.set("Access-Control-Max-Age", 86400);
        res.set("Date", new Date().toUTCString());
        res.set("Connection", "keep-alive");
        res.set("X-Powered-By", "mchat");

        const responseObject = {
            "status": "fail",
            "response": {
                "message": "",
                "error": error
            }
        }
        return res.json(responseObject);
    }
}

module.exports = SendResponse;